export interface Record {
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
}
declare const records: Record[];
export default records;
