<script setup lang="ts">
import { NButton } from 'niui';
const onBtnClick = () => {
  console.log('测试 emits');
};
</script>

<template>
  <div>
    <NButton @click="onBtnClick">按钮</NButton>
  </div>
</template>
