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

The app is built with `@sveltejs/adapter-node` and runs on a Clever Cloud [Node.js](https://www.clever.cloud/developers/guides/sveltekit/) application. Pages are prerendered where possible; the Node server handles everything else.

The local link to the Clever Cloud application lives in `.clever.json`, which is not committed. To set up an application that deploys on every push to `main`:

```sh
npm i -g clever-tools
clever login

clever create -t node --github <owner>/<repo> <app-name>
clever env set CC_NODE_DEV_DEPENDENCIES "install"
clever env set CC_POST_BUILD_HOOK "npm run build"
clever env set CC_RUN_COMMAND "node build"
clever env set PROTOCOL_HEADER "x-forwarded-proto"
clever env set HOST_HEADER "host"
```

To work with an existing application from a fresh clone, link it by name or ID:

```sh
clever link <app-name-or-id>
```

Pushing to `main` on GitHub triggers a deployment. `clever restart` redeploys the latest commit, and `clever logs` shows the build and runtime logs.
