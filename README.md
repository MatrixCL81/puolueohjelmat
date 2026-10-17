# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@1.1.1 create --template minimal --types ts --add prettier eslint vitest="usages:unit,component" sveltekit-adapter="adapter:node" paraglide="languageTags:fi,sv,en+demo:yes" --install npm ./
```

## Adding features

Add features to your project with `sv add`:

```sh
npx sv add
```

For example, to add Tailwind CSS:

```sh
npx sv add tailwindcss
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying to Clever Cloud

The site is prerendered with `@sveltejs/adapter-static` and served by a Clever Cloud [Static](https://www.clever.cloud/developers/guides/sveltekit/) application.

The local link to the Clever Cloud application lives in `.clever.json`, which is not committed. To deploy, link your clone to an application first:

```sh
npm i -g clever-tools
clever login

# either create a new Static application…
clever create -t static
clever env set CC_WEBROOT "/build"
clever env set CC_BUILD_COMMAND "npm install && npm run build"
clever env set SERVER_FALLBACK_PAGE "./build/200.html"

# …or link an existing one by name or ID
clever link <app-name-or-id>
```

Then deploy the committed `HEAD`:

```sh
clever deploy
clever open
```
