import { rhLoader } from "./loader.js";
import { App } from "./components/App.js";

const { rh } = await rhLoader();

const app = rh(App);
document.body.appendChild(app);
