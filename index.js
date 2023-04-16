import { rh } from "https://unpkg.com/@rhjs/rh@latest/dist/main.modern.module.js";
import { App } from "./App.js";

const app = rh(App);
document.body.appendChild(app);
