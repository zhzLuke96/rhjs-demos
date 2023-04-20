const lib_src = "https://unpkg.com/@rhjs/rh@latest/dist/main.module.mjs";
export const demos = [
  {
    title: "hello world",
    desc: "",
    code: `
import { rh, tools, reactivity } from "${lib_src}";
const { ref } = reactivity;

const nowDate = ref(new Date().toLocaleString());
setInterval(() => (nowDate.value = new Date().toLocaleString()), 1000);

const app = rh('h1', {}, tools.rt\`hello world, now: \$\{nowDate}\`);
document.querySelector('#app').appendChild(app);
    `.trim(),
  },
  {
    title: "Counter component",
    desc: "",
    code: `
import { rh, reactivity } from "${lib_src}";
const { ref } = reactivity;

const counter = {
  setup({ defValue = 0 }) {
    const count = ref(defValue);
    return {
    count,
    inc: () => count.value++,
    dec: () => count.value--,
    };
  },
  render({ count, inc, dec }) {
    return rh(
    'div',
    {},
    rh('h1', {}, 'count: ', count),
    rh('button', { onclick: inc }, '+'),
    rh('button', { onclick: dec }, '-')
    );
  },
};

rh.mount('#app', counter);
rh.mount('#app', counter);
    `.trim(),
  },
  {
    title: "mouse position monitor",
    desc: "",
    code: `
import {
  rh,
  tools,
  reactivity,
  builtin,
} from "${lib_src}";
const { ref } = reactivity;

const data = ref({ x: 0, y: 0 });
window.addEventListener(
  "mousemove",
  (ev) => (data.value = { x: ev.x, y: ev.y })
);

const mouse_cursor = rh(
  "div",
  {},
  rh(builtin.Style, {
    styleFn: () => ({
      zIndex: -1,
      position: "absolute",
      top: \`calc(\${data.value.y}px - 0.5rem)\`,
      left: \`calc(\${data.value.x}px - 0.5rem)\`,
      pointerEvents: "none",
      backgroundColor: "red",
      width: "1rem",
      height: "1rem",
      borderRadius: "1rem",
    }),
  })
);
document.querySelector("#app").appendChild(mouse_cursor);

const app = rh(
  "pre",
  {},
  tools.rt\`mouse position:
\${() => JSON.stringify(data.value, null, 2)}\`
);
document.querySelector("#app").appendChild(app);
    `.trim(),
  },
];
