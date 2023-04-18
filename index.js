import { rh } from "https://unpkg.com/@rhjs/rh@latest/dist/main.modern.mjs";
import { App } from "./App.js";

const app = rh(App);
document.body.appendChild(app);
