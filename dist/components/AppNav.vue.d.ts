import type { PropType as __PropType } from 'vue';
import type { Record } from "../lib/recordingsData";
declare const _sfc_main: import("vue").DefineComponent<{
    recordingsCount: {
        type: __PropType<number>;
        required: true;
    };
    selectedRecording: {
        type: __PropType<Record | null>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:selectedRecording" | "unselectRecording" | "selectPreviousRecording" | "selectNextRecording")[], "update:selectedRecording" | "unselectRecording" | "selectPreviousRecording" | "selectNextRecording", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    recordingsCount: {
        type: __PropType<number>;
        required: true;
    };
    selectedRecording: {
        type: __PropType<Record | null>;
        required: true;
    };
}>> & {
    "onUpdate:selectedRecording"?: ((...args: any[]) => any) | undefined;
    onUnselectRecording?: ((...args: any[]) => any) | undefined;
    onSelectPreviousRecording?: ((...args: any[]) => any) | undefined;
    onSelectNextRecording?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _sfc_main;
