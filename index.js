import { rh } from "@rhjs/rh";
import { App } from "./components/App.js";

const app = rh(App);
document.body.appendChild(app);
