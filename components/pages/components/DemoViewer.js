import { rhLoader } from "../../../loader.js";

const { rh, utils, builtin } = await rhLoader();
const { Style } = builtin;
const { computed, reactivity } = utils;
const { ref, unref } = reactivity;

export const MonacoEditor = ({ defaultValue, onChange, ...props }) => {
  const loadMonaco = () =>
    import(
      "https://unpkg.com/@monaco-editor/loader@1.3.3/lib/umd/monaco-loader.min.js"
    ).then(() => window.monaco_loader.init());
  let editor, model;
  return () =>
    rh("div", {
      ...props,
      ref: async (dom) => {
        const monaco = await loadMonaco();
        editor = monaco.editor.create(dom, {
          value: defaultValue,
          language: "javascript",
          automaticLayout: true,
          wordWrap: true,
          theme: "vs-dark",
        });
        model = editor.getModel();
        model.onDidChangeContent(() => onChange(model.getValue()));
      },
    });
};
export const DemoViewer = ({
  title,
  defaultValue,
  width,
  height,
  editDefaultHidden = true,
  iframeDefaultHidden = false,
  ...props
}) => {
  const script_text = ref(defaultValue || "");
  const script_real_text = ref(defaultValue || "");
  const srcdoc = computed(
    () =>
      `<div id="app" style="color: #fff;"><\/div><script type="module">${unref(
        script_real_text
      )}<\/script>`
  );

  const hidden_vars = {
    textarea: ref(editDefaultHidden),
    iframe: ref(iframeDefaultHidden),
  };
  const bodyStyleFn = () => ({
    display: "flex",
    width: "100%",
    maxWidth: "100%",
    height: height || "400px",
    "& .code-editor": {
      display: hidden_vars.textarea.value ? "none" : "inline-block",
      flex: 1,
      width: "50%",
    },
    "& iframe": {
      display: hidden_vars.iframe.value ? "none" : "inline-block",
      flex: 1,
      border: 0,
    },
  });
  const iframeRef = ref();
  const not_dirty_script = computed(
    () => script_real_text.value.trim() === script_text.value.trim()
  );
  return () =>
    rh(
      "div",
      { ...props },
      rh(Style, {
        styleFn: () => ({
          display: "inline-block",
          width: width || "100%",
          color: "#fff",
          backgroundColor: "#1e1e1e",
        }),
      }),
      title ? rh("p", {}, title) : null,
      rh(
        "div",
        { style: "display: flex; align-items: center; height: 30px;" },
        rh(
          "div",
          { style: "display: inline-block; width: 50%;" },
          rh(
            "button",
            {
              disabled: not_dirty_script,
              onclick: () => {
                if (script_real_text.value !== script_text.value) {
                  script_real_text.value = script_text.value;
                } else {
                  iframeRef.value.contentWindow.location.reload();
                }
              },
            },
            rh(Style, {
              styleFn: () => ({
                display: hidden_vars.textarea.value ? "none" : "inline-block",
              }),
            }),
            "▶ run"
          ),
          rh(
            "div",
            { style: "display: inline-block; width: 50%;" },
            rh(
              "label",
              {},
              rh("input", {
                type: "checkbox",
                checked: computed(() => !hidden_vars.textarea.value),
                onclick: (ev) => {
                  hidden_vars.textarea.value = !hidden_vars.textarea.value;
                },
              }),
              "editor"
            )
          )
        ),
        rh(
          "div",
          { style: "display: inline-block; width: 50%;" },
          rh(
            "label",
            {},
            rh("input", {
              type: "checkbox",
              checked: computed(() => !hidden_vars.iframe.value),
              onclick: (ev) => {
                hidden_vars.iframe.value = !hidden_vars.iframe.value;
              },
            }),
            "preview"
          )
        )
      ),
      rh(
        "div",
        {},
        rh(Style, {
          styleFn: bodyStyleFn,
        }),
        rh(
          "div",
          { ref: (dom) => (dom.className = "code-editor") },
          rh(MonacoEditor, {
            defaultValue,
            onChange: (text) => (script_text.value = text),
            style: "height: 100%; width: 100%;",
          })
        ),
        rh("iframe", { srcdoc, ref: iframeRef })
      )
    );
};
