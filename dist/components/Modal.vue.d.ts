declare const _sfc_main: {
    props: {
        visible: {
            type: BooleanConstructor;
            required: boolean;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        imageSrc: {
            type: StringConstructor;
            default: string;
        };
        url: {
            type: StringConstructor;
            default: string;
        };
        currentLocation: {
            type: StringConstructor;
            default: string;
        };
    };
    data(): {
        startAtCurrentLocation: boolean;
    };
    emits: string[];
    methods: {
        closeModal(): void;
        closeOnOverlayClick(): void;
    };
};
export default _sfc_main;
