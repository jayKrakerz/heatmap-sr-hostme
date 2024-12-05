import { Record } from '../lib/recordingsData';
export declare function useRecordings(records: Record[]): {
    selectedDeviceFilter: import("vue").Ref<"all" | "desktop" | "tablet" | "mobile">;
    sortColumn: import("vue").Ref<keyof Record | null>;
    sortDirection: import("vue").Ref<"asc" | "desc">;
    filteredSortedRecords: import("vue").ComputedRef<Record[]>;
    selectedRecording: import("vue").Ref<{
        screenRecording: string;
        date: string;
        intentLevel: number;
        purchaseValue: number;
        purchaseChange: number;
        entryPage: string;
        duration: string;
        pages: number;
        deviceType: string;
        videoUrl: string;
        pageClicks: number;
        deadClicks: number;
        browser: string;
    } | null>;
    selectPreviousRecording: () => void;
    selectNextRecording: () => void;
};
