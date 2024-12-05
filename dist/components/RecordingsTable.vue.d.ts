import type { PropType as __PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    selectedRecording: {
        type: __PropType<any>;
        required: true;
        default: null;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("unselectRecording" | "selectRecording" | "updateRecordingsCount")[], "unselectRecording" | "selectRecording" | "updateRecordingsCount", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    selectedRecording: {
        type: __PropType<any>;
        required: true;
        default: null;
    };
}>> & {
    onUnselectRecording?: ((...args: any[]) => any) | undefined;
    onSelectRecording?: ((...args: any[]) => any) | undefined;
    onUpdateRecordingsCount?: ((...args: any[]) => any) | undefined;
}, {
    selectedRecording: any;
}, {}>;
export default _sfc_main;
