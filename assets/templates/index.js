import { h, render } from "./web_modules/preact";
import App from "./components/App";
var appMount = document.querySelector("#app");
if (appMount) render(h(App, null), appMount);
export default App;