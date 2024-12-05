<template>
    <div class="flex space-x-0.5 justify-center items-end">
        <span v-for="index in 4" :key="index" :class="{
            'bg-[#FE812F]': index === 1 && limitedIntentLevel >= 1, // Color for intent level 1
            'bg-[#F8AD52]': index === 2 && limitedIntentLevel >= 2, // Color for intent level 2
            'bg-[#A2C768]': index === 3 && limitedIntentLevel >= 3, // Color for intent level 3
            'bg-[#2EC666]': index === 4 && limitedIntentLevel >= 4, // Color for intent level 4
        }" :style="{
            backgroundColor: index > limitedIntentLevel ? '#F6F6F6' : '',
            border: index > limitedIntentLevel ? '1px solid #DDDDDD' : 'none',
            height: `${8 + index * 2}px`,
            opacity: index <= limitedIntentLevel ? 1 : 0.6,
        }" class="w-[6px] rounded-md"></span>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"; // Keep only necessary imports

const props = withDefaults(defineProps<{
    intentLevel: number;
}>(), {
    intentLevel: 1, // default to 1 if not provided
});

// Ensure intentLevel is between 1 and 4
const limitedIntentLevel = computed(() => Math.min(Math.max(props.intentLevel, 1), 4));
</script>


<style scoped>
    /* Additional styling if needed */
</style>
