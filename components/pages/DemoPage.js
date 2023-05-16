import { hero_patterns } from "../hero_patterns.js";

import { DemoViewer } from "./components/DemoViewer.js";
import { demos } from "./demos.js";

import { rh, builtin } from "@rhjs/rh";
const { Style, Fragment } = builtin;

const DemoPageBody = () => {
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
        rh("p", {}, "Lightweight & Powerful framework.")
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
      )
    );
};

const DemoPageFooter = () => {
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

export const DemoPage = () => {
  return () =>
    rh(
      Fragment,
      {},
      rh("article", {}, rh(DemoPageBody)),
      rh("footer", {}, rh(DemoPageFooter))
    );
};
