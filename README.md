# Welcome to RemixWP!

A RemixJs app inspired by WordPress.

## Built with RemixJs

- [Remix Docs](https://remix.run/docs)

## Development

1. Copy .sample.env to .env file and fillout the environmental variables
2. From your terminal:

```sh
yarn seed
```

or

```sh
npm run seed
```

to seed neccessary database then collections, then run,

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
yarn build
```

or

```sh
npm run build
```

Then run the app in production mode:

```sh
yarn start
```

or

```sh
npm run start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
