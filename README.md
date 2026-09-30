<div align="center">

# turborepo-boilerplate

**A production-ready monorepo starter for Next.js apps that share a design system.**

[![Stars](https://img.shields.io/github/stars/MahdiTa97/turborepo-boilerplate?style=social)](https://github.com/MahdiTa97/turborepo-boilerplate/stargazers)
[![Forks](https://img.shields.io/github/forks/MahdiTa97/turborepo-boilerplate?style=social)](https://github.com/MahdiTa97/turborepo-boilerplate/network/members)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![CI](https://github.com/MahdiTa97/turborepo-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/MahdiTa97/turborepo-boilerplate/actions/workflows/ci.yml)
[![Last commit](https://img.shields.io/github/last-commit/MahdiTa97/turborepo-boilerplate?style=flat-square)](https://github.com/MahdiTa97/turborepo-boilerplate/commits/main)

</div>

---

Most monorepo starters give you a folder structure and call it a day. This one gives you
the boring parts **already solved**: shared UI with isolated Tailwind styles, one place to
change lint rules, one place to change TS config, and a build cache that makes the second
app you add almost free.

It's a superset of Vercel's `create-turbo` example — same Turborepo + Yarn workspace
foundation, plus a working `ui` package with daisyUI and Vercel's ESLint style guide wired in.

## Why use this over `create-turbo`

|                                     | `create-turbo`                | This starter                            |
| ----------------------------------- | ----------------------------- | --------------------------------------- |
| Shared UI package                   | stub                          | working, with daisyUI + 5 components    |
| Tailwind config for a package       | not set up                    | shared preset via `@repo/tailwind-config` |
| Lint config                         | default Next.js               | [Vercel style guide](https://github.com/vercel/style-guide) |
| TS config                           | copied per app                | shared presets, extended per app        |
| CI                                  | none                          | lint + type-check + build               |
| Dependabot                          | manual                        | enabled                                 |

## Stack

Next.js 15 · React 18 · TypeScript · [Turborepo](https://turbo.build/repo) · Yarn
workspaces · Tailwind CSS 3 · [daisyUI](https://daisyui.com/) · ESLint 8 ·
[Prettier](https://prettier.io/)

## Quick start

```sh
git clone https://github.com/MahdiTa97/turborepo-boilerplate.git
cd turborepo-boilerplate
yarn install
yarn dev
```

`web` is served on [http://localhost:3000](http://localhost:3000).

> Requires **Node.js 20+** and **Yarn 1.x** (a repo-managed `packageManager` field pins this).

## Repository layout

```
.
├── apps/
│   └── web/                      # Next.js app (add more apps here)
│       └── src/app/              # App Router
└── packages/
    ├── ui/                       # Shared React components + daisyUI theme
    ├── tailwind-config/          # Single source of truth for theme & plugins
    ├── eslint-config/            # next.js + library lint presets
    └── typescript-config/        # base / nextjs / react-library tsconfigs
```

Turbo runs every script across `apps/*` and `packages/*` and caches the results.

## Scripts

Run from the repo root:

| Command         | What it does                                              |
| --------------- | --------------------------------------------------------- |
| `yarn dev`      | Start every app in watch mode (persistent, uncached)       |
| `yarn build`    | Build all packages then apps, respecting dependency order |
| `yarn lint`     | ESLint across every workspace                              |
| `yarn type-check` | `tsc --noEmit` across every workspace                    |
| `yarn format`   | Prettier + Tailwind class sorting                         |
| `yarn clean`    | Remove build artifacts                                     |

## Adding a second app

Apps are workspaces — there's no registry to update.

```sh
mkdir apps/admin && cd apps/admin
yarn create next-app . --typescript --tailwind --app --eslint
```

Then wire up the shared pieces by copying `apps/web/tsconfig.json`, `next.config.js` and
`tailwind.config.ts`. Because both apps share `@repo/ui` and `@repo/tailwind-config`,
Turborepo builds `@repo/ui` once and both apps consume the same cache entry.

## How the shared UI package works

`@repo/ui` is consumed **directly from source** — no build step between editing a component
and seeing it in the app:

```json
// packages/ui/package.json
"exports": {
  ".": "./src/index.tsx",
  "./styles.css": "./dist/index.css"
}
```

This is what makes it instant:

1. Apps enable `transpilePackages: ["@repo/ui"]` in `next.config.js`.
2. Next.js compiles the `.tsx` files as part of the app build.
3. The package's CSS is compiled separately to `dist/index.css`, so Tailwind classes from
   `packages/ui` are always in the compiled output.

### Where Tailwind's `content` globs come from

Tailwind only generates CSS for classes it can see in `content`. `packages/ui` therefore
scans its own source **and** the daisyUI / react-daisyUI source in `node_modules`:

```ts
// packages/ui/tailwind.config.ts
content: [
  './src/**/*.tsx',
  '../../node_modules/daisyui/dist/**/*.js',
  '../../node_modules/react-daisyui/dist/**/*.js',
],
```

If you add a component library to the UI package, add its glob here too — otherwise its
classes compile to nothing and the component renders unstyled.

### Styles are not prefixed

Classes in `@repo/ui` are written without a `ui-` prefix. The config is shared with the
apps, so a prefix would have to be applied consistently everywhere to be safe — and with a
single shared package it buys nothing.

If you later add a second UI package and need isolation, set a prefix once:

```ts
// packages/ui/tailwind.config.ts
const config = {
  prefix: "ui-",   // then update every class in src/ to match
  /* … */
};
```

Remember `group-hover:` stays unprefixed — Tailwind prefixes the utility, not the variant.

## Theming

Change the theme in `packages/tailwind-config/tailwind.config.ts` and every app updates.

```ts
export default {
  theme: { extend: { /* … */ } },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald"],   // any daisyUI theme
  },
};
```

daisyUI's full theme list is in their [themes documentation](https://daisyui.com/themes/).

## Included components

| Component           | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `Card`              | Link card with hover transition                     |
| `Container`         | Centered responsive container                       |
| `Navbar`            | daisyUI navbar with dropdown menu                    |
| `HeroLogin`         | Split hero + sign-in form layout                     |
| `Button`, `Theme`   | Re-exported from `react-daisyui`                     |

Import from the package root:

```tsx
import { Card, Container, Navbar, Button } from "@repo/ui";
```

## Adding a lint rule

`@repo/eslint-config` exposes two presets — extend the right one:

| Preset             | For                                    |
| ------------------ | -------------------------------------- |
| `@repo/eslint-config/next.js` | Next.js apps                    |
| `@repo/eslint-config/library.js` | Plain TS/React libraries     |

```js
// apps/web/.eslintrc.js
module.exports = { extends: ["@repo/eslint-config/next.js"] };
```

Both extend `@vercel/style-guide`, so you get consistent, opinionated rules out of the box.

## Adding a TypeScript preset

```jsonc
// apps/web/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": { "plugins": [{ "name": "next" }] }
}
```

Available presets: `base.json`, `nextjs.json`, `react-library.json`.

## CI

Every push and pull request runs lint, type-check and build:

```yaml
# .github/workflows/ci.yml
- run: yarn lint
- run: yarn type-check
- run: yarn build
```

Dependabot keeps dependencies current automatically.

## Requirements

- Node.js **20+**
- Yarn **1.x** (`corepack enable` if needed)

## License

[MIT](./LICENSE) — use it freely, including commercially.

## Contributing

Issues and pull requests are welcome. If you're adding a feature, please open an issue first
so we can agree on the direction — this repo is deliberately small and opinionated.

## Acknowledgements

- [Turborepo](https://turbo.build/repo) and the `create-turbo` example
- [daisyUI](https://daisyui.com/) and [react-daisyui](https://github.com/daisyui/react-daisyui)
- [Vercel style guide](https://github.com/vercel/style-guide)