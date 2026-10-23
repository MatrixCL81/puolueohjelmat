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

Pushing to `main` on GitHub triggers a deployment. `clever restart` redeploys the latest commit, and `clever logs` shows the build and runtime logs. If a deployment ran before the environment variables were set, use `clever restart --without-cache`, so the cached build from that run is not reused.
