import { defineComponent, h } from "vue";
import HeatmapScreenRecordingComponent from "./components/HeatmapScreenRecording.vue";
export const HeatmapScreenRecording = defineComponent({
  name: "HeatmapScreenRecording",
  components: {
    HeatmapScreenRecordingComponent,
  },
  setup() {
    return () => h(HeatmapScreenRecordingComponent);
  },
});
export default HeatmapScreenRecording;
// Add this line to export the type
export type { PropType as HeatmapScreenRecordingProps } from "vue";