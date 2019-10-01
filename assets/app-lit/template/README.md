# 🖥️ create-pika-app

#### 🎉 `@Pika/Web` + `lit-html` + `lit-element` Example Project

<img width="500px" src="https://i.imgur.com/f3oYQJS.png" align="right"></img>

## 🚀 Getting Started

```bash
npm install
npm start
```

It will then be available at `localhost:5000`

## A note on directives

If you want to use directives, you'll have to add them to the `webDependencies` property in your `package.json`:

```json
  "@pika/web": {
    "webDependencies": [
        "lit-html",
        "lit-element",
        "lit-html/directives/until.js",
        "lit-html/directives/class-map.js"
    ],
  },
```

or

```json
  "@pika/web": {
    "webDependencies": [
        "lit-html",
        "lit-element",
        "lit-html/directives/"
    ],
  },
```

### 🙏 Special Thanks

[@pika/web](https://github.com/pikapkg/web)  
[lit-html](https://github.com/polymer/lit-html)
[lit-element](https://github.com/polymer/lit-element)
[create-pika-app](https://github.com/ndom91/create-pika-app)

---

📝 `License:` [`MIT`](https://opensource.org/licenses/MIT)
