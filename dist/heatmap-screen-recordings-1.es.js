import { openBlock as a, createElementBlock as s, defineComponent as p, h as m } from "vue";
const i = {
  name: "HeatmapScreenRecording"
}, _ = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, c] of t)
    n[o] = c;
  return n;
}, d = { class: "text-white" };
function f(e, t, n, o, c, l) {
  return a(), s("main", d, "Hello");
}
const r = /* @__PURE__ */ _(i, [["render", f]]), g = p({
  name: "HeatmapScreenRecording",
  components: {
    HeatmapScreenRecordingComponent: r
  },
  setup() {
    return () => m(r);
  }
});
export {
  g as HeatmapScreenRecording,
  g as default
};
