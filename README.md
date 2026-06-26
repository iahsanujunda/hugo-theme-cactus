# Cactus — Hugo theme

A responsive, clean and simple theme for Hugo. A faithful port of
[hexo-theme-cactus](https://github.com/probberechts/hexo-theme-cactus) by
Pieter Robberechts.

![Cactus — dark](https://raw.githubusercontent.com/iahsanujunda/hugo-theme-cactus/main/images/screenshot.png)

## Features

- Four color schemes: **dark**, **light**, **classic**, **white**
- Responsive layout (desktop / tablet / mobile post menus)
- Tags & categories with a logarithmic tag cloud
- Year-grouped, paginated archive
- Client-side search (no server, no external service)
- Table of contents, post galleries, social-share links
- Comments via **Disqus** or **utterances**
- Analytics: Google, Umami, Baidu, Cloudflare
- MathJax, Open Graph / Twitter cards, RSS, 404
- Internationalization — 17 languages included
- RTL support (loads the Vazir font)

## Requirements

- **Hugo extended ≥ 0.158**.
- **Dart Sass** — installed separately. The theme's stylesheet uses Sass
  modules (`@use`) and the `css.Sass` `vars` option, both of which require the
  Dart transpiler; Hugo's bundled LibSass does **not** support them, so the
  site will fail to build without Dart Sass. Install it any of these ways:

  ```sh
  brew install dart-sass        # macOS / Linux (Homebrew)
  npm install -g sass           # any platform with Node
  snap install dart-sass        # Linux (snap)
  ```

  See the [Hugo docs](https://gohugo.io/functions/css/sass/#dart-sass) for more.

## Install

Pick one of the two methods, then copy the annotated configuration from
[exampleSite/hugo.toml](exampleSite/hugo.toml) into your site.

### Option 1 — Git submodule

```sh
git submodule add https://github.com/iahsanujunda/hugo-theme-cactus themes/cactus
```

Then set the theme in your config:

```toml
theme = "cactus"
```

### Option 2 — Hugo Modules

Initialize modules in your site (once), then import the theme:

```sh
hugo mod init github.com/<your-user>/<your-site>
```

```toml
[module]
  [[module.imports]]
    path = "github.com/iahsanujunda/hugo-theme-cactus"
```

Update later with `hugo mod get -u`.

## Quick start

Prefer to try it first? Run the bundled example site from this repo:

```sh
cd exampleSite
hugo server --themesDir ../..
```

Open <http://localhost:1313>.

## Configuration

All theme options live under `[params]`. The block below lists **every**
available option with its default — copy what you need into your site config.
The same set (with demo values) lives in
[exampleSite/hugo.toml](exampleSite/hugo.toml).

### Site config the theme needs

```toml
[pagination]
  pagerSize = 8                     # posts per archive page

[taxonomies]
  tag = "tags"
  category = "categories"

[markup]
  [markup.highlight]
    style = "monokai"               # any Chroma style (hugo gen chromastyles)
    noClasses = false
  [markup.goldmark.renderer]
    unsafe = true                   # allow raw HTML in Markdown

# Required for the client-side search index (/index.json)
[outputs]
  home = ["HTML", "RSS", "JSON"]

# Navigation menu
[menus]
  [[menus.main]]
    name = "home"
    url = "/"
    weight = 1
  [[menus.main]]
    name = "about"
    url = "/about/"
    weight = 2
  [[menus.main]]
    name = "articles"
    url = "/posts/"
    weight = 3
  [[menus.main]]
    name = "projects"
    url = "https://github.com/you"
    weight = 4
  [[menus.main]]
    name = "search"
    url = "/search/"
    weight = 5
```

### Theme params

```toml
[params]
  author = "John Doe"
  description = "Your bio. Rendered as **Markdown** on the home page."
  dateFormat = "2 Jan 2006"         # Go time layout, e.g. "14 Nov 2016"
  direction = "ltr"                 # "rtl" loads the Vazir font
  projectsUrl = "https://github.com/you"

  # Look & feel (compiled into the stylesheet via Dart Sass)
  colorscheme = "dark"              # dark | light | classic | white
  pageWidth = 48                    # page width in rem

  rss = true                        # show the RSS feed link

  # Logo / avatar in the header
  [params.logo]
    enabled = true
    width = 50
    height = 50
    url = "/images/logo.png"
    gravatar = false                # use your Gravatar instead of `url`
    grayout = true                  # grayscale until hovered

  # Favicons
  [params.favicon]
    [params.favicon.desktop]
      url = "/images/favicon.ico"
    [params.favicon.android]
      url = "/images/favicon-192x192.png"
    [params.favicon.apple]
      url = "/images/apple-touch-icon.png"

  # Gravatar (used by logo/favicon when their `gravatar = true`)
  [params.gravatar]
    email = "name@email.com"
    hash = ""                       # or an md5 hash instead of the email

  # Home page overview
  [params.tagsOverview]
    enabled = false                 # show a tag cloud on the home page
  [params.postsOverview]
    showAllPosts = false            # true = paginate all posts; false = recent N
    postCount = 5                   # N most-recent posts when showAllPosts = false
    sortUpdated = false             # sort by last-modified instead of date
  [params.archive]
    sortUpdated = false
  [params.post]
    showUpdated = false             # show "Updated:" date on posts

  # Footer copyright years (blank endYear = current year)
  [params.copyright]
    startYear = 2024
    # endYear = 2025

  # 404 page
  [params.error404]
    enabled = true
    title = "404 Page Not Found"
    description = "The page you are looking for might have been removed."

  # Open Graph / social metadata
  [params.openGraph]
    fbAppId = ""
    fbAdmins = ""
    twitterId = ""

  # Math typesetting
  [params.mathjax]
    enabled = false

  # Comments — Disqus
  [params.disqus]
    enabled = false
    shortname = ""

  # Comments — utterances
  [params.utterances]
    enabled = false
    repo = "owner/repo"
    issueTerm = "pathname"          # pathname | url | title | …
    label = "Comment"
    theme = "github-dark"

  # Analytics
  [params.googleAnalytics]
    enabled = false
    id = ""
  [params.baiduAnalytics]
    enabled = false
    id = ""
  [params.cloudflareAnalytics]
    enabled = false
    id = ""
  [params.umamiAnalytics]
    enabled = false
    id = ""
    host = "https://analytics.example.com"
    scriptName = "umami.js"

  # Load assets from a CDN instead of bundling them locally
  [params.cdn]
    enable = true
    fontAwesome = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"

  # Social links — repeat the block per account.
  # `icon` is a Font Awesome brand name (or "mail" / "rss"); `label` is optional.
  [[params.socialLinks]]
    icon = "github"
    link = "https://github.com/you"
  [[params.socialLinks]]
    icon = "mail"
    link = "mailto:name@email.com"
  [[params.socialLinks]]
    icon = "mastodon"
    label = "mastodon.social"
    link = "https://mastodon.social/@you"
```

### Per-page front matter

```yaml
thumbnail: "/images/cover.jpg"   # share image (falls back to `banner`)
banner: "/images/cover.jpg"
photos: ["/img/1.jpg", "/img/2.jpg"]   # renders a justified gallery
comments: true                   # enable comments on this post
link: "https://example.com"      # "link post" — title links off-site in lists
layout: search                   # turn a page into the search page
```

## Deployment

Dart Sass is a **build-time** dependency, so your deploy/CI environment must
have it too (the CSS is pre-compiled so the browser never needs it). The most
portable way to add it is via npm, which is available on virtually every build
image:

```sh
npm install -g sass
```

- **GitHub Actions** — after installing Hugo **extended**, add a step before the
  build:

  ```yaml
  - run: npm install -g sass
  - run: hugo --minify
  ```

- **Netlify / Cloudflare Pages / Vercel** — use a Hugo **extended** version and
  prepend the Sass install to the build command:

  ```sh
  npm install -g sass && hugo --minify
  ```

If a build fails with a `TOCSS-DART` error or a message about installing Dart
Sass, the transpiler is missing from that environment.

## Differences from the Hexo theme

This is a faithful clone, with a few deliberate modernizations:

- **Zero jQuery** — `main.js` is vanilla; the gallery is a vanilla justified
  layout and the copy button uses the native Clipboard API.
- Stylus → **SCSS** (Dart Sass via Hugo Pipes); dynamic config flows through the
  `css.Sass` `vars` option.
- Syntax highlighting via **Chroma** instead of the 70 bundled Stylus themes.
- The utterances `issue-term` now honors the configured value (upstream
  hard-coded it to `pathname`).

## License

MIT — see [LICENSE](LICENSE). Original theme © Pieter Robberechts.
