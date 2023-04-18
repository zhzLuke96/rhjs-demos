import {
  rh,
  builtin,
} from "https://unpkg.com/@rhjs/rh@latest/dist/main.modern.mjs";

import { hero_patterns } from "./hero_patterns.js";
import { DemoViewer } from "./DemoViewer.js";
import { demos } from "./demos.js";

const { Style } = builtin;

const AppHeader = () => {
  return () =>
    rh(
      "nav",
      {},
      rh(Style, {
        styleFn: () => ({
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          "& a": {
            marginRight: "1rem",
          },
        }),
      }),
      rh("a", {}, "🚧Docs"),
      rh("a", {}, "🚧Components"),
      rh("a", {}, "🚧Demos"),
      rh(
        "a",
        { href: "https://www.github.com/zhzluke96/rh.js", target: "_blank" },
        "Github"
      )
    );
};
const AppBody = () => {
  return () =>
    rh(
      "div",
      {},
      rh(Style, {
        styleFn: () => ({
          height: "100%",
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }),
      }),
      rh(
        "div",
        {
          style: "margin-bottom: 40px;",
        },
        rh(
          "h1",
          {},
          rh(Style, {
            styleFn: () => ({
              fontWeight: "bold",
              fontSize: "60px",
            }),
          }),
          "🧩 rh.js"
        ),
        rh("p", {}, "lightweight & advanced framework.")
      ),
      // demos
      rh(
        "div",
        {},
        rh(Style, {
          styleFn: () => ({
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            width: "100%",
          }),
        }),
        rh("h2", {}, "Demos"),
        ...demos.map((demo, idx) =>
          rh(DemoViewer, {
            title: `DEMO${idx + 1}: ${demo.title}`,
            defaultValue: demo.code,
            width: "800px",
            height: "400px",
            style:
              "border-radius: 0.5rem; box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;margin-bottom: 40px;",
          })
        )
      ),
      rh(
        "div",
        {
          style:
            "width: 100%; display: flex; flex-flow: column; align-items: center;",
        },
        rh("h2", {}, "Playground"),
        rh(DemoViewer, {
          defaultValue: demos[0].code,
          width: "calc(100% - 6rem)",
          height: "calc(100vh - 6rem)",
          editDefaultHidden: false,
        })
      )
    );
};
const AppFooter = () => {
  return () =>
    rh(
      "div",
      {},
      rh(Style, {
        styleFn: () => ({
          ...hero_patterns.endless_clouds,
          marginTop: "1rem",
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }),
      }),
      "2023 - rh.js |",
      rh(
        "a",
        {
          target: "_blank",
          href: "https://github.com/zhzluke96/rhjs-demos/",
        },
        "Edit this page"
      )
    );
};

export const App = () => {
  return () =>
    rh(
      "div",
      {},
      rh(Style, {
        styleFn: () => ({
          ...hero_patterns.graph_paper,
          overflow: "auto",
          color: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexFlow: "column",
          fontFamily: `'Karla', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`,
          "& header": {
            height: "2rem",
          },
          "& article": {
            flex: 1,
          },
          "& footer": {
            height: "200px",
          },
          "& a": {
            color: "#fff",
            textDecoration: "underline",
            textDecorationStyle: "dotted",
            cursor: "pointer",
            "&:hover": {
              textDecorationStyle: "solid",
            },
          },
        }),
      }),
      rh("header", {}, rh(AppHeader)),
      rh("article", {}, rh(AppBody)),
      rh("footer", {}, rh(AppFooter))
    );
};
