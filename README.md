# 📦✨ @pika/init

Start a bundler-free  [`@pika/web`](https://github.com/pikapkg/web) web application with a single command!  
Previously released as `create-pika-app`, created by [@ndom91](https://github.com/ndom91)

![Usage Gif](cpa.gif)

## 🛫 Quick Start

```js
npx @pika/init awesome-new-app-directory
cd awesome-new-app-directory
npm run dev
```

The example application will then be available at [`localhost:5000`](http://127.0.0.1:5000)

## 💻 Usage

```js
Usage: npx @pika/init --template [template] <project-name>

Options:
  -V, --version              output the version number
  -t, --template [template]  template choice (optional)
  -h, --help                 output usage information

Examples:
  $ npx @pika/init --template app-preact my-new-app
  $ npx @pika/init --template app-lit my-new-app
  $ npx @pika/init my-new-app
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
   `git clone https://github.com/pikapkg/init pika-init`

2. Install the project  
   `cd pika-init && npm install`

To test execution of the binary:

3. Build the binary
   `npm run build`

4. Generate a test application
   `node pkg/dist-node/index.bin.js generated-test-app-name`

5. Fork, commit & push your changes, and then make a pull request back to this repository!

---

📝 `Licence`[`MIT`](https://opensource.org/licenses/MIT)
