<template>
    <div class="relative flex flex-col lg:flex-row">
        <!-- Scroll Indicator Overlay -->
        <ScrollIndicatorOverlay :isVisible="showScrollIndicator" :isRecordingActive="!!selectedRecording" />

        <div
            :class="['transition-all duration-500 ease-in-out flex-shrink-0', selectedRecording ? 'lg:w-1/4' : 'w-full']">
            <div class="mt-4">
                <FilterComponent @filter-device="handleFilterDevice" :isRecordingActive="!!selectedRecording" />
            </div>

            <!-- Recording Details Displayed When a Recording is Selected -->
            <div v-if="selectedRecording"
                class="grid grid-cols-1 text-[14px] max-h-[500px] overflow-y-auto mt-4 border border-[#DDDDDD] scrollbar-hide"
                @scroll="handleScroll">
                <div v-for="(record, index) in filteredSortedRecords" :key="record.screenRecording" :class="[
                    'border-b border-gray-300 cursor-pointer',
                    { 'active_video': selectedRecording.screenRecording === record.screenRecording },
                    hoveredRow === index ? 'bg-[#F6F6F6]' : ''
                ]" @click="selectRecording(record, index)" @mouseover="hoveredRow = index"
                    @mouseleave="hoveredRow = null">

                    <!-- First Row: Player Icon, Screen Recording, Device Image, Duration -->
                    <div class="flex items-center space-x-4 w-full justify-between py-2 px-4">
                        <div class="flex items-center gap-2">
                            <img :src="selectedRecording.screenRecording === record.screenRecording ? hoverPlayIcon : playIcon"
                                alt="Play icon" class="w-8 h-8" />
                            <span>{{ record.screenRecording }}</span>
                            <img v-if="record.deviceType === 'desktop'" :src="desktopIcon" alt="Desktop Icon"
                                class="w-4 h-4" />
                            <img v-if="record.deviceType === 'mobile'" :src="mobileIcon" alt="Mobile Icon"
                                class="w-4 h-4" />
                            <img v-if="record.deviceType === 'tablet'" :src="tabletIcon" alt="Tablet Icon"
                                class="w-4 h-4" />
                        </div>
                        <div class="flex items-center gap-2">
                            <img :src="durationIcon" alt="Duration Icon" class="w-4 h-4" />
                            <span>{{ record.duration }}</span>
                        </div>
                    </div>

                    <!-- Second Row: Buying Intent, Page Clicks, Dead Clicks, Purchase Value -->
                    <div class="flex items-center space-x-4 justify-between py-2 px-4">
                        <BuyingIntentIndicator :intentLevel="record.intentLevel" />
                        <div class="flex items-center gap-2">
                            <img :src="clickIcon" alt="Click Icon" class="align-middle w-4 h-4" />
                            <span class="align-middle">{{ record.pageClicks }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <img :src="deadClickIcon" alt="Dead Click Icon" class="align-middle w-4 h-4" />
                            <span class="align-middle">{{ record.deadClicks }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <img :src="purchaseValueIcon" alt="Purchase Value Icon" class="align-middle w-4 h-4" />
                            <span>
                                <PurchaseValueIndicator :value="record.purchaseValue"
                                    :percentage="record.purchaseChange" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Table Body when Video is Not Active -->
            <div class="p-4" v-else>
                <div class="overflow-hidden border border-[#DDDDDD] rounded-xl shadow-sm">
                    <table class="min-w-full bg-white">
                        <thead>
                            <tr class="text-left border-b">
                                <th class="px-6 py-3 text-xs font-semibold cursor-pointer">
                                    Screen Recording
                                </th>
                                <th @click="handleSort('intentLevel')"
                                    class="px-6 py-3 text-xs font-semibold text-center cursor-pointer"
                                    @mouseover="hoveredSort = 'intentLevel'" @mouseleave="hoveredSort = null">
                                    <img :src="intentIcon" alt="Intent Icon" class="w-4 h-4 inline mr-1" />
                                    Intent
                                    <img :src="getSortIcon('intentLevel')" alt="Sort Icon" class="sort-icon" />
                                </th>
                                <th @click="handleSort('purchaseValue')"
                                    class="px-6 py-3 text-xs font-semibold text-center cursor-pointer"
                                    @mouseover="hoveredSort = 'purchaseValue'" @mouseleave="hoveredSort = null">
                                    <img :src="purchaseValueIcon" alt="Purchase Value Icon"
                                        class="w-4 h-4 inline mr-1" />
                                    Purchase Value
                                    <img :src="getSortIcon('purchaseValue')" alt="Sort Icon" class="sort-icon" />
                                </th>
                                <th @click="handleSort('duration')"
                                    class="px-6 py-3 text-xs font-semibold text-center cursor-pointer"
                                    @mouseover="hoveredSort = 'duration'" @mouseleave="hoveredSort = null">
                                    <img :src="durationIcon" alt="Duration Icon" class="w-4 h-4 inline mr-1" />
                                    Duration
                                    <img :src="getSortIcon('duration')" alt="Sort Icon" class="sort-icon" />
                                </th>
                                <th @click="handleSort('pageClicks')"
                                    class="px-6 py-3 text-xs font-semibold text-center cursor-pointer"
                                    @mouseover="hoveredSort = 'pageClicks'" @mouseleave="hoveredSort = null">
                                    <img :src="clickIcon" alt="Click Icon" class="w-4 h-4 inline mr-1" />
                                    Page Clicks
                                    <img :src="getSortIcon('pageClicks')" alt="Sort Icon" class="sort-icon" />
                                </th>
                                <th @click="handleSort('deadClicks')"
                                    class="px-6 py-3 text-xs font-semibold text-center cursor-pointer"
                                    @mouseover="hoveredSort = 'deadClicks'" @mouseleave="hoveredSort = null">
                                    <img :src="deadClickIcon" alt="Dead Click Icon" class="w-4 h-4 inline mr-1" />
                                    Dead Clicks
                                    <img :src="getSortIcon('deadClicks')" alt="Sort Icon" class="sort-icon" />
                                </th>
                                <th @click="handleSort('entryPage')"
                                    class="px-6 py-3 text-xs font-semibold text-center cursor-pointer"
                                    @mouseover="hoveredSort = 'entryPage'" @mouseleave="hoveredSort = null">
                                    <img :src="webIcon" alt="Web Icon" class="w-4 h-4 inline mr-1" />
                                    Entry Page
                                    <img :src="getSortIcon('entryPage')" alt="Sort Icon" class="sort-icon" />
                                </th>
                                <th @click="handleSort('browser')"
                                    class="px-6 py-3 text-xs font-semibold text-center cursor-pointer"
                                    @mouseover="hoveredSort = 'browser'" @mouseleave="hoveredSort = null">
                                    <img :src="browserIcon" alt="Browser Icon" class="w-4 h-4 inline mr-1" />
                                    Browser
                                    <img :src="getSortIcon('browser')" alt="Sort Icon" class="sort-icon" />
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(record, index) in filteredSortedRecords" :key="record.screenRecording" :class="[
                                'border-b cursor-pointer text-[14px]',
                                { 'active_video': selectedRecording?.screenRecording === record.screenRecording },
                                index % 2 ? 'bg-gray-50' : '',
                                hoveredRow === index ? 'bg-[#F6F6F6]' : ''
                            ]" @mouseover="hoveredRow = index" @mouseleave="hoveredRow = null"
                                @click="selectRecording(record, index)">
                                <td class="px-6 py-4 flex items-center space-x-2">
                                    <button class="flex items-center space-x-2">
                                        <img :src="selectedRecording?.screenRecording === record.screenRecording || hoveredRow === index ? hoverPlayIcon : playIcon"
                                            alt="Play icon" class="w-8 h-8" />
                                        <span>{{ record.screenRecording }}</span>
                                        <img v-if="record.deviceType === 'desktop'" :src="desktopIcon"
                                            alt="Desktop Icon" class="w-4 h-4 inline" />
                                        <img v-if="record.deviceType === 'mobile'" :src="mobileIcon" alt="Mobile Icon"
                                            class="w-4 h-4 inline" />
                                        <img v-if="record.deviceType === 'tablet'" :src="tabletIcon" alt="Tablet Icon"
                                            class="w-4 h-4 inline" />
                                    </button>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <BuyingIntentIndicator :intentLevel="record.intentLevel" />
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <PurchaseValueIndicator :value="record.purchaseValue"
                                        :percentage="record.purchaseChange" />
                                </td>
                                <td class="px-6 py-4 text-center">{{ record.duration }}</td>
                                <td class="px-6 py-4 text-center">{{ record.pageClicks }}</td>
                                <td class="px-6 py-4 text-center">{{ record.deadClicks }}</td>
                                <td class="px-6 py-4 text-center truncate" title="{{ record.entryPage }}">
                                    {{ record.entryPage }}
                                </td>
                                <td class="px-6 py-4 text-center">{{ record.browser }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Video Player Section -->
        <transition name="slide">
            <div v-if="selectedRecording" class="w-full lg:w-3/4 p-4 bg-gray-100 mt-4 lg:mt-0">
                <VideoPlayer v-if="selectedRecording" :videoUrl="selectedRecording.videoUrl"
                    @close="unselectRecording" />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

// Data and Types
import records from "../lib/recordingsData";
import type { Record } from "../lib/recordingsData";

// Components
import ScrollIndicatorOverlay from "./ScrollIndicatorOverlay.vue";
import BuyingIntentIndicator from "./BuyingIntentIndicator.vue";
import FilterComponent from "./FilterComponent.vue";
import PurchaseValueIndicator from "./PurchaseValueIndicator.vue";
import VideoPlayer from "./VideoPlayer.vue";

// Icons
import playIcon from "@/assets/play.svg";
import hoverPlayIcon from "@/assets/hover_play.svg";
import durationIcon from "@/assets/clock-icon.svg";
import clickIcon from "@/assets/cursor-box.svg";
import deadClickIcon from "@/assets/dead-clicks.svg";
import purchaseValueIcon from "@/assets/purchase-value.svg";
import desktopIcon from "@/assets/tb-desktop.svg";
import mobileIcon from "@/assets/tb-mobile.svg";
import tabletIcon from "@/assets/tb-tablet.svg";
import intentIcon from "@/assets/intent.svg";
import browserIcon from "@/assets/browser-icon.svg";
import webIcon from "@/assets/web-icon.svg";

import normalSortIcon from "@/assets/normal-sort.svg";
import hoverSortIcon from "@/assets/hover-sort.svg";
import ascSortIcon from "@/assets/asc-sort.svg";
import descSortIcon from "@/assets/desc-sort.svg";

/** Props **/
interface Props {
    selectedRecording: Record | any;
}

const props = withDefaults(defineProps<Props>(), {
    selectedRecording: null,

});
console.log(props.selectedRecording);

/** Emits **/
const emit = defineEmits<{
    selectRecording: [record: Record];
    updateRecordingsCount: [count: number];
    unselectRecording: [];
}>();

/** State **/
const hoveredRow = ref<number | null>(null);
const hoveredSort = ref<keyof Record | null>(null);
const showScrollIndicator = ref(true);
const selectedDeviceFilter = ref<"all" | "desktop" | "mobile" | "tablet">("all");
const sortColumn = ref<keyof Record | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");
const selectedIndex = ref<number | null>(null); // Track selected recording index

/** Computed Properties **/
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

/** Functions **/

// Handle filter change
function handleFilterDevice(device: "all" | "desktop" | "mobile" | "tablet") {
    selectedDeviceFilter.value = device;
}

// Handle sort change
function handleSort(column: keyof Record) {
    if (sortColumn.value === column) {
        if (sortDirection.value === "asc") {
            sortDirection.value = "desc"; // Switch to descending
        } else {
            // Reset to default (unsorted)
            sortColumn.value = null;
            sortDirection.value = "asc"; // Default direction when a new column is sorted
        }
    } else {
        // Set new column to sort
        sortColumn.value = column;
        sortDirection.value = "asc";
    }
}


// Select a recording
function selectRecording(record: Record, index: number) {
    selectedIndex.value = index;
    emit("selectRecording", record);
}

// Unselect the recording
function unselectRecording() {
    selectedIndex.value = null;
    emit("unselectRecording");
}


// Get the appropriate sort icon
function getSortIcon(column: keyof Record) {
    if (sortColumn.value === column) {
        return sortDirection.value === "asc" ? ascSortIcon : descSortIcon;
    }
    if (hoveredSort.value === column) {
        return hoverSortIcon;
    }
    return normalSortIcon; // Default normal icon
}

// Handle scroll events for the overlay
function handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    showScrollIndicator.value = target.scrollTop === 0;
}

/** Watchers **/
watch(
    () => filteredSortedRecords.value.length,
    (newCount) => emit("updateRecordingsCount", newCount),
    { immediate: true }
);
</script>



<style scoped>
    .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 15ch;
    }

    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }

    .active_video {
        background-color: #DAFBED;
        border-left: 4px solid #2EC666;
    }

    .sort-icon {
        display: inline-block;
        margin-left: 2px;
        width: 16px;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.5s ease;
    }

    .slide-enter-from {
        transform: translateX(100%);
        /* Start off-screen to the right */
    }

    .slide-enter-to {
        transform: translateX(0);
        /* Slide to its original position */
    }

    .slide-leave-from {
        transform: translateX(0);
        /* Start at its original position */
    }

    .slide-leave-to {
        transform: translateX(10%);
        /* Slide out to the right */
    }
</style>