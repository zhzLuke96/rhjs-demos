import { DemoViewer } from "./components/DemoViewer.js";
import { demos } from "./demos.js";
import { rhLoader } from "../../loader.js";

const { rh, builtin } = await rhLoader();
const { Style } = builtin;

export const PlaygroundPage = () => {
  return () =>
    rh(
      "div",
      {
        style:
          "width: 100%; display: flex; flex-flow: column; align-items: center;",
      },
      //   rh("h2", {}, "Playground"),
      rh(DemoViewer, {
        defaultValue: demos[0].code,
        width: "calc(100%)",
        height: "calc(100vh - 20px - 30px)",
        editDefaultHidden: false,
      })
    );
};
