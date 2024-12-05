// useRecordings.ts
import { ref, computed } from 'vue';
import { Record } from '../lib/recordingsData';

export function useRecordings(records: Record[]) {
  const selectedDeviceFilter = ref<"all" | "desktop" | "mobile" | "tablet">("all");
  const sortColumn = ref<keyof Record | null>(null);
  const sortDirection = ref<"asc" | "desc">("asc");
  const selectedRecording = ref<Record | null>(null);

  const filteredSortedRecords = computed(() => {
    let sortedRecords = selectedDeviceFilter.value === "all"
      ? [...records]
      : records.filter((record) => record.deviceType === selectedDeviceFilter.value);

    if (sortColumn.value) {
      sortedRecords.sort((a, b) => {
        const aValue = a[sortColumn.value as keyof Record];
        const bValue = b[sortColumn.value as keyof Record];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection.value === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection.value === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    return sortedRecords;
  });

  function selectPreviousRecording() {
    if (selectedRecording.value) {
      const currentIndex = filteredSortedRecords.value.findIndex(
        r => r.screenRecording === selectedRecording.value?.screenRecording
      );
      if (currentIndex > 0) {
        selectedRecording.value = filteredSortedRecords.value[currentIndex - 1];
      }
    }
  }

  function selectNextRecording() {
    if (selectedRecording.value) {
      const currentIndex = filteredSortedRecords.value.findIndex(
        r => r.screenRecording === selectedRecording.value?.screenRecording
      );
      if (currentIndex < filteredSortedRecords.value.length - 1) {
        selectedRecording.value = filteredSortedRecords.value[currentIndex + 1];
      }
    }
  }

  return {
    selectedDeviceFilter,
    sortColumn,
    sortDirection,
    filteredSortedRecords,
    selectedRecording,
    selectPreviousRecording,
    selectNextRecording,
  };
}
