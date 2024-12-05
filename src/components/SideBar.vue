<template>
  <div class="sidebar w-[60px] flex flex-col gap-y-6 border-r border-gray50 items-center py-6">
    <!-- Sidebar content goes here -->
    <a class="cursor-pointer hover:bg-primary50 p-2 rounded-lg">
      <img src="../assets/dashboard.svg" alt="dashboard" class="w-[20px]" /></a>
    <a class="cursor-pointer hover:bg-primary50 p-2 rounded-lg">
      <img src="../assets/hotspot.svg" alt="hotspot" class="w-[20px]" /></a>
    <a class="cursor-pointer hover:bg-primary50 bg-primary50 p-2 rounded-lg">
      <img src="../assets/video.svg" alt="video" class="w-[20px]" /></a>
    <a class="cursor-pointer hover:bg-primary50 p-2 rounded-lg">
      <img src="../assets/reading.svg" alt="reading" class="w-[20px]" /></a>
    <a class="cursor-pointer hover:bg-primary50 p-2 rounded-lg">
      <img src="../assets/setting.svg" alt="settings" class="w-[20px]" /></a>
  </div>
</template>

<script lang="ts">
export default {
  name: "SideBar",
  data() {
    return {
      // Component data goes here
    };
  },
  methods: {
    // Component methods go here
  },
  computed: {
    // Computed properties go here
  },
  mounted() {
    // Lifecycle hook
  },
};
</script>

<style scoped>
  /* Styles for the sidebar go here */
</style>
