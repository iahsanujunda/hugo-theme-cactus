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

## Deployment

Dart Sass is a **build-time** dependency, so your deploy/CI environment must
have it too (the browser never needs it — the CSS is pre-compiled). The most
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
