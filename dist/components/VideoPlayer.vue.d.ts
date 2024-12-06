declare const _sfc_main: {
    props: {
        videoUrl: {
            type: StringConstructor;
            required: boolean;
        };
    };
    data(): {
        progress: number;
        duration: number;
        currentTime: number;
        isPlaying: boolean;
        isExpanded: boolean;
        playbackRate: number;
        dropdownOpen: boolean;
        playbackRates: number[];
        isLoading: boolean;
        hoveredTimestamp: null;
        timestamps: {
            label: string;
            time: number;
            percentage: number;
            type: string;
        }[];
    };
    watch: {
        videoUrl(newUrl: any): void;
    };
    methods: {
        handleLoadedMetadata(): void;
        hideLoader(): void;
        updateProgress(): void;
        seekTo(time: any): void;
        playVideo(): void;
        pauseVideo(): void;
        onPlay(): void;
        onPause(): void;
        toggleExpand(): void;
        formatTime(seconds: number): string;
        togglePlayPause(): void;
        toggleDropdown(): void;
        selectPlaybackRate(rate: number): void;
        showTooltip(index: any): void;
        hideTooltip(): void;
    };
};
export default _sfc_main;
