# 📦✨ @pika/init

> Bootstrap a [`@pikapkg/web`](https://github.com/pikapkg/web) application in no time!

![Usage Gif](cpa.gif)

## 🛫 Quick Start

```js
npx pika-init awesome-new-app --template app-preact
cd awesome-new-app
npm run dev
```

The example application will then be available at [`localhost:5000`](http://127.0.0.1:5000)

## 💻 Usage

```js
Usage: pika-init --template [template] <project-name>

Options:
  -V, --version              output the version number
  -t, --template [template]  template choice (optional)
  -h, --help                 output usage information

Examples:
  $ pika-init --template app-preact my-new-app
  $ pika-init my-new-app
```

## 🌲 Templates

1. `app-preact`

<img width="400px" src="https://github.com/ndom91/terminal-homepage/raw/develop/terminal.gif" align="right"></img>

Slimmed down version of [`terminal-homepage`](https://github.com/ndom91/terminal-homepage) built on the following stack:

- Preact
- Preact-router
- Preact-emotion
- Typescript
- Babel
- ESLint
- Prettier
- @Pika/Web

2. `app-vue`

<img width="500px" src="https://imgur.com/A2msrQA.png" align="right"></img>

- Vue
- http-vue-Loader
- Basic todo list example
- Original Source: [glitch.me/pika-web-vue-httpvueloader](https://glitch.com/edit/#!/pika-web-vue-httpvueloader)
- Thanks: [`@thiagoabreu`](https://github.com/thiagoabreu)

3. `Your next app` 😎

If you'd like to have your project included here, just open a PR and we'll take a look!

## 🚧 Contributing

1. Clone the repo  
   `git clone https://github.com/pikapkg/init pika-init`

2. Install the project  
   `cd pika-init && npm install`

To test execution of the binary:

3. Build the binary
   `npm run build`

4. Generate a test application
   `node pkg/dist-node/index.bin.js generated-test-app-name`

5. Fork, commit & push your changes, and then make a pull request back to this repository!

### 🙏 Special Thanks

[`@pika/web`](https://pika.dev)  
[`@pika/pkg`](https://pika.dev)  
[`preact`](https://preactjs.com)

---

📝 `Licence`[`MIT`](https://opensource.org/licenses/MIT)
