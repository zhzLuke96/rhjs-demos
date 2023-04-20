import { hero_patterns } from "./hero_patterns.js";
import { connectHashRouter } from "./HashRouter.js";
import { DemoPage } from "./pages/DemoPage.js";
import { PlaygroundPage } from "./pages/Playground.js";
import { rhLoader } from "../loader.js";

const { rh, builtin, utils } = await rhLoader();
const { Style } = builtin;
const { computed } = utils;

const RouterLink = ({ path, title }) => {
  const { goto, hash_route } = connectHashRouter();
  const cssText = computed(
    () => `font-weight: ${hash_route.value === path ? 900 : "unset"}`
  );
  return () =>
    rh(
      "a",
      {
        style: cssText,
        onclick: () => goto(path),
      },
      title
    );
};

const AppHeader = () => {
  const links = [
    {
      path: "doc",
      title: "Doc",
    },
    {
      path: "component",
      title: "Component",
    },
    {
      path: "demo",
      title: "Demo",
    },
    {
      path: "playground",
      title: "Playground",
    },
  ];
  return () =>
    rh(
      "nav",
      {
        style: "height: 20px;",
      },
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
      ...links.map((props) => rh(RouterLink, { ...props })),
      rh(
        "a",
        { href: "https://www.github.com/zhzluke96/rh.js", target: "_blank" },
        "Github"
      )
    );
};
const EmptyBody =
  (title = "404 NOT FOUND") =>
  () => {
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
        rh("h1", {}, title),
        rh(
          "span",
          {},
          rh("span", {}, "link:"),
          rh("span", { style: "width: 1rem;display: inline-block;" }),
          rh(
            "a",
            {
              href: "https://www.github.com/zhzluke96/rh.js",
              target: "_blank",
            },
            "github"
          ),
          rh("span", { style: "width: 1rem;display: inline-block;" }),
          rh(
            "a",
            {
              href: "https://www.npmjs.com/package/@rhjs/rh",
              target: "_blank",
            },
            "npm"
          )
        )
      );
  };

export const App = () => {
  const { addRoute, RouterView } = connectHashRouter();
  addRoute("demo", DemoPage);
  addRoute("playground", PlaygroundPage);
  addRoute("doc", EmptyBody("🚧 Doc PAGE WIP 🚧"));
  addRoute("component", EmptyBody("🚧 Component PAGE WIP 🚧"));
  addRoute("*", EmptyBody());
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
      rh(RouterView)
    );
};
