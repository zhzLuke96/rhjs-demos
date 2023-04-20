const version = "0.0.21";
// const version = "latest";
const package_url = `https://unpkg.com/@rhjs/rh@${version}/dist/main.module.mjs`;
export const rhLoader = () => import(package_url);
