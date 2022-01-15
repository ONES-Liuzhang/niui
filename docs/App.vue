<template>
  <div>
    <button @click="increament">+</button>
    {{ countNumber }}
    <button @click="decreament">-</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const countNumber = ref(0);

// 增加
function increament() {
  countNumber.value++;
}

// 减少
function decreament() {
  countNumber.value--;
}
</script>
