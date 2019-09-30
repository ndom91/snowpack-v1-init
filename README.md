# 📦✨ create-pika-app

> Bootstrap a [`@pikapkg/web`](https://github.com/pikapkg/web) application in no time!

![Usage Gif](cpa.gif)

## 🛫 Quick Start

```js
npx create-pika-app awesome-new-app --template app-preact
cd awesome-new-app
npm run dev
```

The example application will then be available at [`localhost:5000`](http://127.0.0.1:5000)

## 💻 Usage

```js
Usage: create-pika-app --template [template] <project-name>

Options:
  -V, --version              output the version number
  -t, --template [template]  template choice (optional)
  -h, --help                 output usage information

Examples:
  $ create-pika-app --template app-preact my-new-app
  $ create-pika-app --template app-lit my-new-app
  $ create-pika-app my-new-app
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
- Basic ToDo List Example
- Original Source: [glitch.me/pika-web-vue-httpvueloader](https://glitch.com/edit/#!/pika-web-vue-httpvueloader)
- Thanks: [`@thiagoabreu`](https://github.com/thiagoabreu)

3. `app-lit`

<img width="500px" src="https://i.imgur.com/f3oYQJS.png" align="right"></img>

- LitElement
- lit-html
- Basic To do List Example
- Thanks: [`@thepassle`](https://github.com/thepassle)


3. `Your next app` 😎

If you'd like to have your project included here, just open a PR and we'll take a look!

## 🚧 Contributing

1. Clone the repo  
   `git clone https://github.com/ndom91/create-pika-app`

2. Install the project  
   `cd create-pika-app && npm install`

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
