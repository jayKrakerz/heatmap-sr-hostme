<template>
    <div class="flex items-center justify-center">
        <!-- Purchase Value -->
        <span class="">{{ formattedValue }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    value: number;
    percentage: number;
}>();

const formattedValue = computed(() => `$${props.value.toFixed(2)}`);
</script>
