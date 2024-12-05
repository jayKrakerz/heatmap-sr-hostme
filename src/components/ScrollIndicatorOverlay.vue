<template>
    <div v-if="visible" class="scroll-indicator-overlay"
        :class="isRecordingActive ? 'justify-start recording-active' : 'justify-center'">
        <div :class="isRecordingActive ? 'ml-4 text-highlight' : ''">
            <img :src="mouseIcon" class="w-6 h-6 inline mr-2" />
            <span class="scroll-text">Scroll for more...</span>
            <img :src="scrollDown" class="w-6 h-6 inline mr-2" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import mouseIcon from "@/assets/mouse-icon.svg";
import scrollDown from "@/assets/scroll-down.svg";

const props = defineProps({
    isVisible: Boolean,
    isRecordingActive: Boolean
});

const visible = ref(props.isVisible);

function handleWindowScroll() {
    if (visible.value && window.scrollY > 0) {
        visible.value = false;
    }
}

onMounted(() => {
    window.addEventListener("scroll", handleWindowScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleWindowScroll);
});

watch(() => props.isVisible, (newVal) => {
    visible.value = newVal;
});
</script>

<style scoped>
    .scroll-indicator-overlay {
        display: flex;
        align-items: center;
        color: #34a853;
        font-weight: 500;
        font-size: 14px;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%);
        z-index: 50;
        transition: opacity 0.3s ease, background 0.3s ease, color 0.3s ease;
    }

    .scroll-indicator-overlay.recording-active {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%);
        transition: opacity 0.3s ease, background 0.3s ease, color 0.3s ease;
        color: #2ec666;
        width: 25%;
        bottom: 40px;
        justify-content: center;
    }

    .scroll-text {
        margin-right: 5px;
    }


</style>
