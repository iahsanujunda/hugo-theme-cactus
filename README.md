# Cactus — Hugo theme

A responsive, clean and simple theme for Hugo. A faithful port of
[hexo-theme-cactus](https://github.com/probberechts/hexo-theme-cactus) by
Pieter Robberechts.

![Cactus — dark](https://probberechts.github.io/hexo-theme-cactus/cactus-dark/public/images/logo.png)

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
- **Dart Sass** installed separately (`brew install dart-sass`, or see the
  [Hugo docs](https://gohugo.io/functions/css/sass/#dart-sass)). The theme uses
  the `css.Sass` `vars` option, which requires the Dart transpiler — the bundled
  LibSass does not support it.

## Quick start

Try the bundled example site:

```sh
cd exampleSite
hugo server --themesDir ../..
```

Open <http://localhost:1313>.

### Use it in your own site

Install as a Hugo module or clone into `themes/cactus`, then set the theme and
copy the annotated configuration from
[exampleSite/hugo.toml](exampleSite/hugo.toml):

```toml
theme = "cactus"
```

## Configuration

All theme options live under `[params]` — see
[exampleSite/hugo.toml](exampleSite/hugo.toml) for the full, annotated set
(it mirrors the original Hexo `_config.yml`). Highlights:

- `colorscheme` — `dark` | `light` | `classic` | `white`
- `pageWidth` — page width in rem
- `direction` — `ltr` | `rtl`
- `[params.logo]`, `[params.favicon]`, `[params.gravatar]`
- `[params.postsOverview]`, `[params.archive]`, `[params.tagsOverview]`
- Integrations: `[params.disqus]`, `[params.utterances]`, `[params.googleAnalytics]`,
  `[params.umamiAnalytics]`, `[params.baiduAnalytics]`, `[params.cloudflareAnalytics]`,
  `[params.mathjax]`, `[params.cdn]`

Code highlighting uses Hugo's built-in Chroma — set the style under
`[markup.highlight]`. Search requires `[outputs] home = ["HTML", "RSS", "JSON"]`.

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
