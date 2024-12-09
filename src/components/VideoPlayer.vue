<template>
  <div :class="['video-player shadow-md rounded-md', { expanded: isExpanded }]">
    <!-- Loader -->
    <div v-if="isLoading" class="loader-overlay">
      <div class="bg-white p-6 rounded-lg flex flex-col gap-4 justify-center shadow-md">
        <img src="../assets/loader.gif" width="40" class="mx-auto" />
        <p class="text-sm text-gray500">Your Recording is Loading...</p>
      </div>
    </div>

    <!-- Video Section -->
    <video ref="video" @timeupdate="updateProgress" @loadedmetadata="handleLoadedMetadata" @play="onPlay"
      @pause="onPause" @canplay="hideLoader" class="video rounded-t-md" autoplay>
      <source :src="videoUrl" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Controls Section -->
    <div class="flex items-center gap-4 bg-white px-4 py-4 rounded-b-md w-full justify-between">
      <div class="flex items-center gap-4">
        <!-- Playback Speed Control -->
        <div class="relative">
          <!-- Dropdown Toggle -->
          <div @click="toggleDropdown"
            class="dropdown-toggle flex items-center px-4 py-2 border border-[#BEBEBE] rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">
            <span class="text-sm font-semibold">{{ playbackRate }}x</span>
            <img src="../assets/arrowdown.svg" alt="Arrow Down" class="w-4 h-4 ml-2" />
          </div>

          <!-- Dropdown Menu -->
          <div v-if="dropdownOpen"
            class="absolute bottom-10 mt-2 left-0 w-[70px] bg-white rounded-lg shadow-lg border border-[#BEBEBE] z-10 p-2"
            style="box-shadow: 0px 20px 24px -4px rgba(10, 13, 18, 0.08)">
            <div v-for="rate in playbackRates" :key="rate"
              class="flex items-center px-2 py-2 hover:bg-[#DAFBED] hover:border-[#B6EFD7] hover:border hover:rounded-lg cursor-pointer transition-all duration-200"
              @click="selectPlaybackRate(rate)">
              <span class="text-sm font-semibold">{{ rate }}x</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 w-[85%]">
        <!-- Current Time and Duration -->
        <span class="flex gap-2">
          <span>{{ isLoading ? "00:00" : formatTime(currentTime) }}</span>
          <span>/</span>
          <span class="text-gray50">{{
            isLoading ? "00:00" : formatTime(duration)
            }}</span>
        </span>

        <!-- Play/Pause Button -->
        <div>
          <img v-if="!isPlaying" src="../assets/play.svg" alt="play" @click="playVideo" width="40" />
          <img v-else src="../assets/pause.svg" alt="pause" @click="pauseVideo" width="40" />
        </div>

        <!-- Progress Bar with Timestamps -->
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: isLoading ? '0%' : progress + '%' }"></div>
          <div class="timestamps relative" v-if="!isLoading">
            <div v-for="(timestamp, index) in timestamps" :key="index" class="timestamp"
              :style="{ left: timestamp.percentage + '%' }" @click="seekTo(timestamp.time)"
              @mouseover="showTooltip(index)" @mouseleave="hideTooltip">
              <!-- Timestamp Marker -->
              <div v-if="timestamp.type === 'orange'" class="border-2 border-white rounded-full timestamp-icon">
                <div
                  class="h-3 w-3 hover:h-4 hover:w-4 transition-all ease-in rounded-full bg-orange600 border-2 border-orange500 orange">
                </div>
              </div>
              <div v-else-if="timestamp.type === 'green'" class="border-2 border-white rounded-full timestamp-icon">
                <div class="h-3 w-3 rounded-full bg-primary600 border-2 border-primary500 green"></div>
              </div>
              <!-- Tooltip -->
              <span v-if="hoveredTimestamp === index" class="tooltip shadow-md">
                <div class="flex flex-col gap-3 justify-center items-center">
                  <img src="../assets/deadclick.svg" v-if="timestamp.type === 'orange'" alt="icon" class="label-icon" />
                  <img src="../assets/green_label.svg" v-else-if="timestamp.type === 'green'" alt="icon"
                    class="label-icon" />

                  <div class="flex flex-col">
                    <p class="text-sm">
                      {{ timestamp.label }}
                    </p>

                    <p class="text-xs text-gray500">
                      {{ formatTime(timestamp.time) }}
                    </p>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>

        <!-- Skip Inactivity Toggle -->
        <div class="flex items-center gap-2">
          <label class="switch">
            <input type="checkbox" v-model="isPlaying" @change="togglePlayPause" />
            <span class="slider round"></span>
          </label>
          <span class="text-sm whitespace-nowrap">Skip Inactivity</span>
        </div>
      </div>

      <!-- Expand/Shrink Button -->
      <div class="flex items-center gap-4">
        <div>
          <img v-if="!isExpanded" class="videoexpand" src="../assets/expand.svg" alt="Expand" @click="toggleExpand" />
          <img v-else class="videoshrink" src="../assets/shrinkfull.svg" alt="Shrink" @click="toggleExpand" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      progress: 0,
      duration: 0,
      currentTime: 0,
      isPlaying: false,
      isExpanded: false,
      playbackRate: 1,
      dropdownOpen: false,
      playbackRates: [1, 2, 3],
      isLoading: true,
      hoveredTimestamp: null, // For tooltips
      timestamps: [
        { label: "Start", time: 5, percentage: 10, type: "orange" },
        { label: "Middle", time: 30, percentage: 50, type: "green" },
        { label: "End", time: 39, percentage: 90, type: "orange" },
      ],
    };
  },
  watch: {
    videoUrl(newUrl) {
      const video = this.$refs.video as any;
      if (video) {
        this.isLoading = true;
        video.pause();
        video.src = "";
        video.load();

        this.$nextTick(() => {
          video.src = newUrl;
          video.load();
          video.currentTime = 0;
          setTimeout(() => {
            video.play().catch((e: any) => console.error("Playback failed:", e));
            this.isLoading = false;
          }, 2000);
        });
      }
    },
  },
  methods: {
    handleLoadedMetadata() {
      const video = this.$refs.video as any;
      this.duration = video.duration;
    },
    hideLoader() {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    updateProgress() {
      const video = this.$refs.video as any;
      this.currentTime = video.currentTime;
      this.progress = (video.currentTime / video.duration) * 100;
    },
    seekTo(time: any) {
      const video = this.$refs.video as any;
      video.currentTime = time;
    },
    playVideo() {
      const video = this.$refs.video as any;
      video.play();
      this.isPlaying = true;
    },
    pauseVideo() {
      const video = this.$refs.video as any;
      video.pause();
      this.isPlaying = false;
    },
    onPlay() {
      this.isPlaying = true;
    },
    onPause() {
      this.isPlaying = false;
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    formatTime(seconds: number) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    },
    togglePlayPause() {
      if (this.isPlaying) {
        this.pauseVideo();
      } else {
        this.playVideo();
      }
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectPlaybackRate(rate: number) {
      const video = this.$refs.video as any;
      this.playbackRate = rate;
      video.playbackRate = rate;
      this.dropdownOpen = false;
    },
    showTooltip(index: any) {
      this.hoveredTimestamp = index;
    },
    hideTooltip() {
      this.hoveredTimestamp = null;
    },
  },
};

// const deadClicksData = [
//   { time: 5.2, x: 45, y: 60 }, // Click at 5.2 seconds, 45% from left, 60% from top
//   { time: 8.7, x: 30, y: 25 },
//   // ... more clicks
// ];
</script>

<style scoped>
  .loader-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(253, 253, 253, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .videoexpand {
    width: 20px;
    /* height: 20px; */
    cursor: pointer;
    transition: width 0.8s ease;
    transform-origin: center;
    /* transition: height 0.8s ease; */
  }

  .videoexpand:hover {
    width: 25px;
    /* height: 30px; */
  }

  .videoshrink {
    width: 35px;
    cursor: pointer;
    transition: width 0.3s ease;
    transform-origin: center;
  }

  .videoshrink:hover {
    width: 20px;
  }

  .video-player {
    width: 100%;
    /* max-width: 800px; */
    /* margin: auto; */
    text-align: center;
    position: relative;
    transition: transform 0.8s ease, width 0.8s ease, height 0.8s ease;
    transform-origin: bottom right;
  }

  .video-player.expanded {
    position: absolute;
    /* top: -10%; */
    /* left: -3%; */
    width: 100%;
    /* height: 100%; */
    background-color: white;
    z-index: 1000;
    transform: scale(0.97) translate(-35%, -15%);
    margin: 40px;
  }

  .video {
    width: 100%;
    height: auto;
    padding: 0 40px;
    background-color: #363636;
    /* border-radius: 8px; */
  }

  .progress-container {
    position: relative;
    width: 100%;
    height: 5px;
    background: #f6f6f6;
    border-radius: 5px;
    /* margin-top: 10px; */
  }

  .progress-bar {
    position: absolute;
    height: 100%;
    background: #b6efd7;
    border-radius: 5px;
  }

  .label-icon {
    width: 40px;
  }

  .timestamp {
    position: absolute;
    top: -6px;
    transform: translateX(-50%);
    cursor: pointer;
  }

  .timestamp-icon {
    width: 10px;
    height: 10px;
    transition: transform width 0.3s ease;
  }

  .timestamp-icon:hover .orange,
  .timestamp-icon:hover .green {
    width: 15px;
    height: 15px;
    /* transform: scale(1); */
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 20px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked+.slider {
    background-color: #2ec666;
  }

  input:checked+.slider:before {
    transform: translateX(14px);
  }

  .tooltip {
    position: absolute;
    /* top: 50%; */
    bottom: 165%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 12px;
    /* width: 120px; */
    white-space: nowrap;
    opacity: 0;
    width: 0;
    transition: opacity 0.3s ease, transform 0.3s ease, width 0.3s ease;
  }

  .timestamp:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    width: 120px;
  }

  .tooltip::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }

  .custom-select {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .selected-option {
    padding: 8px 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .selected-option-green {
    background-color: #c6f6d5;
    /* bg-green-200 */
    border-color: #2f855a;
    /* border-green-600 */
  }

  .dropdown-options {
    position: absolute;
    /* top: 100%; */
    bottom: 110%;
    left: 0;
    right: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    z-index: 10;
    padding: 8px;
  }

  .dropdown-option {
    padding: 8px;
    cursor: pointer;
  }

  .dropdown-option.selected {
    background-color: #c6f6d5;
    /* bg-green-200 */
    border-color: #2f855a;
    /* border-green-600 */
  }
</style>
