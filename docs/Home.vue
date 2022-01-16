<script setup lang="ts">
import { Observer } from 'mobx-vue-lite';
import { CounterStore } from '../src/store/demo';
import { NButton } from 'niui';

const state = new CounterStore();

const onBtnClick = () => {
  console.log('测试 emits');
};
</script>

<template>
  <Observer>
    <div class="counter">
      <h1 class="count" v-text="state.count" />
      <div class="button__wrapper">
        <button @click="state.decrement">-</button>
        <button @click="state.increment">+</button>
      </div>
    </div>
    <NButton @click="onBtnClick">按钮</NButton>
  </Observer>
</template>
