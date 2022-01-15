<script setup lang="ts">
import { useSlots } from 'vue';
defineProps({
  type: {
    type: String,
    default: 'primary'
  }
});

const emits = defineEmits(['click']);
const handleClick = () => {
  emits('click');
};
</script>

<template>
  <button :class="['n-button', 'n-button--' + type]" @click="handleClick">
    <slot></slot>
  </button>
</template>
