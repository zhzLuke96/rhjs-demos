import { rhLoader } from "../loader.js";

const { reactivity, utils, rh } = await rhLoader();

const { watch } = utils;
const { ref, readonly } = reactivity;

const _hash_route = ref("");
const sync_hash_route = () => [
  (_hash_route.value = window.location.hash.slice(1)),
];
window.addEventListener("hashchange", sync_hash_route);
window.addEventListener("load", sync_hash_route);
export const hash_route = readonly(_hash_route);

const view_route = ref(null);
const routes = {};
const addRoute = (path, component, name) => {
  routes[path] = { component, name };

  sync_hash_route();
  if (hash_route.value === path) {
    view_route.value = routes[path];
  } else if (!view_route.value && path === "*") {
    view_route.value = routes[path];
  }
};
watch(
  () => hash_route.value,
  (path) => {
    view_route.value = routes[path] || routes["*"];
  }
);

const goto = (path) => {
  window.location.hash = `#${path}`;
};
const gotoName = (name) => {
  const [path, route] = Object.entries(routes).find(
    ([path, route]) => route.name === name
  );
  if (route) {
    goto(path);
  } else {
    console.warn(`No route named ${name} found`);
  }
};
const RouterView = () => () => {
  const route = view_route.value;
  if (route) {
    const { component, name } = route;
    return rh(component);
  }
  return rh("span");
};

export const connectHashRouter = () => ({
  routes,
  hash_route,
  addRoute,
  goto,
  gotoName,
  RouterView,
});
