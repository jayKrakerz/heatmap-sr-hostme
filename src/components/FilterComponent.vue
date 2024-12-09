<template>
  <div class="flex items-center justify-between space-x-4 px-4">
    <div class="flex gap-4">
      <!-- Calendar Button -->
      <button
        class="flex items-center px-4 py-2 border border-[#BEBEBE] rounded-lg text-gray-700 hover:bg-gray-100 text-[14px] font-semibold"
        aria-label="Select Date Range">
        <img :src="calendarIcon" alt="Calendar Icon"
          :class="[!isRecordingActive ? 'mr-2' : '', 'w-4 h-4 text-gray-500']" />
        <span v-if="!isRecordingActive">Last 30 Days</span>
      </button>

      <!-- Filter Button -->
      <button
        class="flex items-center px-4 py-2 border border-[#BEBEBE] rounded-lg text-gray-700 hover:bg-gray-100 text-[14px] font-semibold"
        aria-label="Add Filter">
        <img :src="filterIcon" alt="Filter Icon" :class="[!isRecordingActive ? 'mr-2' : '', 'w-4 h-4 text-gray-500']" />
        <span v-if="!isRecordingActive">Add Filter</span>
      </button>
    </div>

    <!-- Device Filters -->
    <div class="flex relative">
      <template v-if="isRecordingActive">
        <!-- Dropdown when video is active -->
        <div @click="toggleDropdown"
          class="dropdown-toggle flex items-center cursor-pointer px-4 py-2 border border-[#BEBEBE] rounded-md text-gray-700 hover:bg-gray-100">
          <!-- Only display the icon, even when dropdown is open -->
          <img :src="getIcon(selectedDevice)" class="w-4 h-4" alt="Selected Device Icon" />
        </div>

        <!-- Dropdown Menu -->
        <div v-if="isDropdownOpen"
          class="absolute top-10 -right-20 w-32 bg-white rounded-lg shadow-lg border border-[#BEBEBE] z-[9999] p-2"
          style="box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.08);">
          <div v-for="device in devices" :key="device.name"
            class="flex items-center px-2 py-2  hover:bg-[#DAFBED] hover:border-[#B6EFD7] hover:border hover:rounded-lg cursor-pointer transition-all duration-200"
            @click="selectDevice(device.name)">
            <img :src="device.icon" alt="" class="w-4 h-4 mr-3" />
            <span class="text-sm font-semibold">{{ device.label }}</span>
          </div>
        </div>
      </template>

      <template v-else>
        <!-- Button filters when video is not active -->
        <button v-for="device in devices" :key="device.name" :class="[
          'filter-button flex items-center justify-center px-4 py-2 cursor-pointer transition border border-midGrey text-[14px] font-semibold',
          { 'bg-primary50': selectedDevice === device.name, 'bg-white': selectedDevice !== device.name },
          { 'rounded-l-lg': device.name === 'all', 'rounded-r-lg': device.name === 'mobile' },
          'filter-shadow'
        ]" @click="selectDevice(device.name)">
          <img :src="device.icon" alt="" class="w-4 h-4 mr-2" />
          <span>{{ device.label }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import AllScreensIcon from "@/assets/allscreens.svg";
import DesktopIcon from "@/assets/desktop.svg";
import TabletIcon from "@/assets/tablet.svg";
import MobileIcon from "@/assets/mobile.svg";
import filterIcon from "@/assets/filter.svg";
import calendarIcon from "@/assets/calendar.svg";

// Define props without assigning them to a variable
defineProps<{
  isRecordingActive: boolean;
}>();

const emit = defineEmits(["filter-device"]);
const selectedDevice = ref("all");
const isDropdownOpen = ref(false);

const devices = [
  { name: "all", icon: AllScreensIcon, label: "All" },
  { name: "desktop", icon: DesktopIcon, label: "Desktop" },
  { name: "tablet", icon: TabletIcon, label: "Tablet" },
  { name: "mobile", icon: MobileIcon, label: "Mobile" },
];

function selectDevice(device: string) {
  selectedDevice.value = device;
  isDropdownOpen.value = false; // close dropdown
  emit("filter-device", selectedDevice.value);
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function getIcon(device: string) {
  const foundDevice = devices.find((d) => d.name === device);
  return foundDevice ? foundDevice.icon : "";
}
</script>

<style scoped>
  .filter-button {
    border-width: 1px;
    border-right-width: 0;
  }

  .filter-button:last-child {
    border-right-width: 1px;
  }

  .filter-shadow {
    box-shadow:
      0px 1px 2px 0px var(--ColorsEffectsShadowsshadow-xs),
      0px -2px 0px 0px #0A0D120D inset,
      0px 0px 0px 1px #0A0D122E inset;
  }

  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .dropdown-item {
    border-bottom: 1px solid #e5e7eb;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
