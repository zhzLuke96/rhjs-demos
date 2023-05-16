const version = "0.0.34";
// const version = "latest";
const package_url = `https://unpkg.com/@rhjs/rh@${version}/dist/main.module.mjs`;

const dom = document.createElement("script");
dom.type = "importmap";
dom.innerHTML = JSON.stringify({
  imports: {
    "@rhjs/rh": package_url,
  },
});
document.head.appendChild(dom);
