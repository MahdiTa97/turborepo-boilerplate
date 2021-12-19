# Turborepo Design System starter

This is an official React design system starter powered by Turborepo.

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `docs`: A placeholder documentation site powered by [Next.js](https://nextjs.org)
- `web`: A website site powered by [Next.js](https://nextjs.org)
- `spa`: A SPA website site powered by [create-react-app](https://create-react-app.dev/)
- `@my/core`: core React components
- `@my/utils`: shared React utilities
- `@my/tsconfig`: shared `tsconfig.json`s used throughout the monorepo
- `eslint-preset-my`: ESLint preset

Each package and app is 100% [Typescript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [Typescript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [CommitLint](https://commitlint.js.org/#/) for commit linting

## Using this boilerplate

If you want to use this in the interim, you run the following command:

```sh
git clone https://github.com/MahdiTa97/turborepo-boilerplate
cd turborepo-boilerplate
yarn install
```

### Changing the NPM organization scope

The NPM organization scope for this design system starter is `@my`. To change this, it's a bit manual at the moment, but you'll need to do the following:

- Rename folders in `packages/*` to replace `my` with your desired scope
- Search and replace `my` with your desired scope
- Re-run `yarn install`

### Publishing packages

#### NPM

If you want to publish package to the public NPM registry and make them publicly available, this is already setup for you.

To publish packages to a private NPM organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```

#### GitHub Package Registry

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package-using-publishconfig-in-the-packagejson-file)
