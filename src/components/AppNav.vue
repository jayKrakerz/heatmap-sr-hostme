<template>
  <nav class="flex p-5 bg-white shadow-md items-center justify-between">
    <!-- Left Sections -->
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-4">
        <img src="../assets/nav-video-icon.svg" alt="Video Icon representing screen recordings" class="w-6 h-6" />
        <h1 :class="[
          'font-bold text-[#363636]',
          selectedRecording ? 'text-[24px]' : 'text-[32px]',
        ]">
          Screen Recordings
        </h1>
        <span class="bg-white text-black rounded-full px-2.5 py-0.4 text-sm border border-mid-grey">
          {{ recordingsCount }}
        </span>
      </div>

      <template v-if="selectedRecording">
        <div class="flex items-center gap-2">
          <img src="../assets/chevron-right.svg" alt="Chevron Icon to indicate navigation"
            class="w-6 h-6 cursor-pointer" />
          <span class="text-lg font-medium">{{
            selectedRecording.screenRecording
          }}</span>
          <img src="../assets/share.svg" alt="Share this recording" class="w-4 h-4 cursor-pointer"
            @click="toggleModal" />
        </div>
        <!-- Modal -->
      </template>
    </div>

    <!-- Right Section -->
    <template v-if="selectedRecording">
      <div class="flex items-center gap-4 relative">
        <!-- Session Details Button -->
        <button @click="toggleSessionDetails"
          class="flex items-center gap-2 border border-mid-grey rounded-lg px-4 py-2 text-[14px] font-medium cursor-pointer hover:bg-[#F6F6F6] hover:border-mid-grey">
          <img src="../assets/beats.svg" alt="Session Details Beats Icon" class="w-4 h-4" />
          <span>Session Details</span>
          <font-awesome-icon :icon="['fas', 'chevron-down']" class="w-4 h-4" />
        </button>

        <!-- Session Details Dropdown -->
        <div v-if="isSessionDetailsVisible"
          class="absolute top-12 right-30 w-80 bg-[#FBFBFB] shadow-lg rounded-lg p-3  border border-mid-grey z-10 text-[14px]"
          style="box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.08);">
          <!-- Engagement Metrics -->
          <div class="mb-2 border border-mid-grey rounded-lg bg-white"
            style="box-shadow: 0px 4px 24px -4px rgba(12, 12, 13, 0.05);">
            <div class="text-[14px] mb-2 border-b border-gray-300 p-2">
              <h4 class="font-semibold">
                <img src="../assets/intent.svg" alt="Intent Icon" class="inline w-4 h-4 mr-2" />Engagement Metrics
              </h4>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">Page Views</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.engagementMetrics.pageViews }}
              </p>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">Clicks</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.engagementMetrics.clicks }}
              </p>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">Purchase Value</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.engagementMetrics.purchaseValue }}
              </p>
            </div>
          </div>
          <!-- Device Information -->
          <div class="mb-2 border border-mid-grey rounded-lg bg-white"
            style="box-shadow: 0px 4px 24px -4px rgba(12, 12, 13, 0.05);">
            <div class="text-[14px] mb-2 border-b border-gray-300 p-2">
              <h4 class="font-semibold">
                <img src="../assets/allScreens.svg" alt="Device Icon" class="inline w-4 h-4 mr-2" />Device Information
              </h4>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">Device</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.deviceInformation.device }}
              </p>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">Model</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.deviceInformation.model }}
              </p>
            </div>
          </div>

          <!-- User Information -->
          <div class="mb-2 border border-mid-grey rounded-lg bg-white"
            style="box-shadow: 0px 4px 24px -4px rgba(12, 12, 13, 0.05);">
            <div class="text-[14px] mb-2 border-b border-gray-300 p-2">
              <h4 class="font-semibold">
                <img src="../assets/user-icon.svg" alt="User Icon" class="inline w-4 h-4 mr-2" />User Information
              </h4>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">User Type</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.userInformation.userType }}
              </p>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">Location</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.userInformation.location }}
              </p>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">Browser</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.userInformation.browser }}
              </p>
            </div>
          </div>

          <!-- Session Details -->
          <div class="border border-mid-grey rounded-lg bg-white"
            style="box-shadow: 0px 4px 24px -4px rgba(12, 12, 13, 0.05);">
            <div class="text-[14px] mb-2 border-b border-gray-300 p-2">
              <h4 class="font-semibold">
                <img src="../assets/clock.svg" alt="Clock Icon" class="inline w-4 h-4 mr-2" />Session Details
              </h4>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">Referrer</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.sessionDetails.referrer }}
              </p>
            </div>
            <div class="flex justify-between p-2">
              <p class="font-medium">URL</p>
              <p class="text-[#7F7F7F]">
                {{ sessionDetails.sessionDetails.referrerURL }}
              </p>
            </div>
          </div>
        </div>

        <!-- Prev and Next Buttons Grouped Together -->
        <div class="flex border border-mid-grey rounded-lg overflow-hidden">
          <!-- Previous Button -->
          <button @click="handlePreviousRecording"
            class="bg-white px-4 py-2 text-[14px] font-medium flex items-center gap-2 border-r border-mid-grey hover:bg-[#F6F6F6]"
            :class="{ 'cursor-not-allowed opacity-50': selectedRecording === null }"
            :disabled="selectedRecording === null">
            <img src="../assets/skip-back.svg" alt="Skip to previous recording" class="w-4 h-4" />
            <span>Prev</span>
          </button>

          <button @click="handleNextRecording"
            class="bg-white px-4 py-2 text-[14px] font-medium flex items-center gap-2"
            :class="{ 'cursor-not-allowed opacity-50': selectedRecording === null }"
            :disabled="selectedRecording === null">
            <span>Next</span>
            <img src="../assets/skip-forward.svg" alt="Skip to next recording" class="w-4 h-4" />
          </button>
        </div>

        <!-- Close Button -->
        <button
          class="bg-[#363636] text-white rounded-lg px-4 py-2 text-[14px] font-medium flex items-center gap-1 border border-black hover:bg-black"
          @click="emitUnselectRecording" @mouseover="hovering = true" @mouseleave="hovering = false">
          <span>Close</span>
          <img :class="{ 'spin-animation': hovering }" src="../assets/close_btn.svg"
            alt="Close button to unselect recording" class="w-4 h-4" />
        </button>
      </div>
    </template>
    <Modal v-if="isModalVisible" :visible="isModalVisible" :image-url="modalData.imageUrl"
      :video-url="modalData.videoUrl" :current-location="modalData.currentLocation" @close="toggleModal" />
  </nav>
</template>

<script setup lang="ts">
import type { Record } from "../lib/recordingsData";
import { sessionDetails } from "../lib/sessionDetailsData";
import Modal from "./Modal.vue";
// Import Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

// Add the icon to the library
library.add(faChevronDown);

// Data for the modal
const modalData = ref({
  imageUrl: "https://www.pexels.com/search/high%20resolution/",
  videoUrl: "https://example.com/video.mp4",
  currentLocation: "00:24",
});

// State to track modal visibility
const isModalVisible = ref(false);
// Function to toggle modal visibility
const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
  console.log("clicked");
  console.log("Modal visibility:", isModalVisible.value);
};

// Register the props
defineProps<{
  recordingsCount: number;
  selectedRecording: Record | null;
}>();

// State for session details visibility
const isSessionDetailsVisible = ref(false);

// Toggle session details dropdown visibility
const toggleSessionDetails = () => {
  isSessionDetailsVisible.value = !isSessionDetailsVisible.value;
};

const hovering = ref(false);

const emit = defineEmits<{
  (e: "update:selectedRecording", value: Record | null): void;
  (e: "unselectRecording"): void;
  (e: "selectPreviousRecording"): void;
  (e: "selectNextRecording"): void;
}>();
const handlePreviousRecording = () => {
  emit("selectPreviousRecording");
};

const handleNextRecording = () => {
  emit("selectNextRecording");
};
function emitUnselectRecording() {
  emit("update:selectedRecording", null);
  emit("unselectRecording");
}
</script>

<style scoped>
  button {
    transition: background-color 0.3s ease;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .absolute {
    position: absolute;
  }

  .top-16 {
    top: 4rem;
  }

  .right-10 {
    right: 2.5rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .spin-animation {
    animation: spin 1s linear infinite;
  }
</style>