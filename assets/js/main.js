// main.js — vanilla port of source/js/main.js (DECIDED: zero jQuery).
// Covers: post-action helpers, responsive nav, the desktop/tablet/mobile post
// menu + scroll behavior, a vanilla justified gallery (replaces the
// jquery.justifiedGallery plugin), and the native-clipboard copy button.

// ── Visibility helpers (mirror jQuery .show()/.hide()/:visible) ──────────────
// jQuery .show() sets an explicit `display` so it overrides a CSS `display:none`
// rule (e.g. `#menu{display:none}`). Clearing the inline style is NOT enough —
// it would just revert to that CSS rule. So: clear inline; if still hidden by
// CSS, force the element's default display for its tag.
var _defaultDisplayCache = {};
function _defaultDisplay(tagName) {
  var tag = tagName.toLowerCase();
  if (_defaultDisplayCache[tag]) return _defaultDisplayCache[tag];
  var probe = document.createElement(tag);
  document.body.appendChild(probe);
  var d = getComputedStyle(probe).display;
  document.body.removeChild(probe);
  if (d === 'none') d = 'block';
  _defaultDisplayCache[tag] = d;
  return d;
}
function _isHidden(el) { return !el || getComputedStyle(el).display === 'none'; }
function _show(el) {
  if (!el) return;
  el.style.display = '';
  if (_isHidden(el)) el.style.display = _defaultDisplay(el.tagName);
}
function _hide(el) { if (el) el.style.display = 'none'; }
function _visible(el) { return !!(el && el.offsetParent !== null && getComputedStyle(el).display !== 'none'); }

// ── Helpers used by the post action partials (§5) ────────────────────────────
window.cactusToggle = function (id) {
  var el = document.getElementById(id);
  if (el) {
    if (_isHidden(el)) _show(el); else _hide(el);
  }
  return false;
};

window.cactusScrollTop = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return false;
};

// ── Vanilla justified gallery (replaces jquery.justifiedGallery) ─────────────
function layoutGallery(container) {
  var gap = 4, targetRowHeight = 140;
  var items = Array.prototype.slice.call(container.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.gap = gap + 'px';

  var width = container.clientWidth;
  if (width <= 0) return;

  var ratios = items.map(function (it) {
    var img = it.querySelector('img');
    return (img && img.naturalWidth && img.naturalHeight) ? img.naturalWidth / img.naturalHeight : 1.5;
  });

  var row = [], rowRatios = [];
  function flush(isLast) {
    var sumR = rowRatios.reduce(function (a, b) { return a + b; }, 0);
    var avail = width - gap * (row.length - 1);
    var h = avail / sumR;
    if (isLast && h > targetRowHeight) h = targetRowHeight; // don't stretch a lone last row
    row.forEach(function (it, i) {
      it.style.width = Math.floor(rowRatios[i] * h) + 'px';
      it.style.height = Math.floor(h) + 'px';
      var img = it.querySelector('img');
      if (img) { img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'cover'; img.style.display = 'block'; }
    });
    row = []; rowRatios = [];
  }

  items.forEach(function (it, i) {
    row.push(it); rowRatios.push(ratios[i]);
    var sumR = rowRatios.reduce(function (a, b) { return a + b; }, 0);
    if ((width - gap * (row.length - 1)) / sumR <= targetRowHeight) flush(false);
  });
  if (row.length) flush(true);
}

function initGalleries() {
  var galleries = Array.prototype.slice.call(document.querySelectorAll('.article-gallery'));
  if (!galleries.length) return;
  function relayout() { galleries.forEach(layoutGallery); }
  relayout();
  // Re-flow once images report their natural size, and on resize.
  galleries.forEach(function (g) {
    g.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) img.addEventListener('load', relayout);
    });
  });
  var t;
  window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(relayout, 150); });
}

// ── Copy button (native clipboard; retargeted to Chroma's .highlight) ────────
function initClipboard() {
  var blocks = document.querySelectorAll('.highlight');
  if (!blocks.length || !navigator.clipboard) return;
  var i18n = window.cactusI18n || {};
  var copyTip = i18n.copyTip || 'Copy to clipboard!';
  var copied = i18n.copied || 'Copied!';
  blocks.forEach(function (block) {
    var btn = document.createElement('span');
    btn.className = 'btn-copy tooltipped tooltipped-sw';
    btn.setAttribute('aria-label', copyTip);
    btn.innerHTML = '<i class="fa-regular fa-clone"></i>';
    block.appendChild(btn);
    btn.addEventListener('click', function () {
      var code = block.querySelector('pre code') || block.querySelector('pre') || block;
      navigator.clipboard.writeText(code.innerText).then(function () {
        btn.setAttribute('aria-label', copied);
      });
    });
  });
}

// ── Post menu (desktop/tablet/mobile) + scroll behavior ──────────────────────
function initPostMenu() {
  var post = document.querySelector('.post');
  if (!post) return;

  var menu = document.getElementById('menu');
  var nav = menu ? menu.querySelector('#nav') : null;
  var menuIcons = [document.getElementById('menu-icon'), document.getElementById('menu-icon-tablet')].filter(Boolean);

  var show = _show, hide = _hide, visible = _visible;

  // Display the menu on hi-res laptops and desktops.
  if (document.documentElement.clientWidth >= 1440) {
    show(menu);
    menuIcons.forEach(function (i) { i.classList.add('active'); });
  }

  // Display the menu if the menu icon is clicked.
  menuIcons.forEach(function (icon) {
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      if (!visible(menu)) {
        show(menu);
        menuIcons.forEach(function (i) { i.classList.add('active'); });
      } else {
        hide(menu);
        menuIcons.forEach(function (i) { i.classList.remove('active'); });
      }
      return false;
    });
  });

  // Hide/show the navigation links on scroll.
  if (menu) {
    var menuIconDesktop = document.getElementById('menu-icon');
    var menuIconTablet = document.getElementById('menu-icon-tablet');
    var topIconTablet = document.getElementById('top-icon-tablet');
    window.addEventListener('scroll', function () {
      var topDistance = menu.getBoundingClientRect().top + window.scrollY;
      if (!visible(nav) && topDistance < 50) {
        show(nav);
      } else if (visible(nav) && topDistance > 100) {
        hide(nav);
      }
      // On tablet, swap the navigation icon for a "scroll to top" icon.
      if (!visible(menuIconDesktop) && topDistance < 50) {
        show(menuIconTablet); hide(topIconTablet);
      } else if (!visible(menuIconDesktop) && topDistance > 100) {
        hide(menuIconTablet); show(topIconTablet);
      }
    });
  }

  // Mobile: reveal the footer menu on scroll-up, hide it on scroll-down.
  if (document.getElementById('footer-post')) {
    var lastScrollTop = 0;
    var footerPost = document.getElementById('footer-post');
    var topAction = document.querySelector('#actions-footer > #top');
    window.addEventListener('scroll', function () {
      var topDistance = window.scrollY;
      if (topDistance > lastScrollTop) { hide(footerPost); } else { show(footerPost); }
      lastScrollTop = topDistance;
      // Close all submenus on scroll.
      ['nav-footer', 'toc-footer', 'share-footer'].forEach(function (id) {
        var el = document.getElementById(id); if (el) el.style.display = 'none';
      });
      if (topDistance < 50) { hide(topAction); } else if (topDistance > 100) { show(topAction); }
    });
  }
}

// ── Bootstrap ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Responsive navigation menu on mobile (header hamburger).
  var icon = document.querySelector('#header > #nav > ul > .icon');
  var navList = document.querySelector('#header > #nav > ul');
  if (icon && navList) {
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      navList.classList.toggle('responsive');
    });
  }

  initGalleries();
  initClipboard();
  initPostMenu();
});
