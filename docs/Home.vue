<script setup lang="ts">
import { Observer } from 'mobx-vue-lite';
import { CounterStore } from '../src/store/demo';
import { NButton } from 'niui';
import { render } from '../src';

const state = CounterStore.create();

const onBtnClick = () => {
  console.log('测试 emits');
};

const schema = {
  type: 'page',
  title: '测试页面',
  body: [
    {
      type: 'button',
      label: 'dialog',
      actionType: 'dialog'
    },
    {
      type: 'button',
      label: 'link',
      actionType: 'link',
      link: '#home'
    }
  ]
};

const rootData = {
  userName: 'lz',
  age: 28
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
    <NButton @click="onBtnClick" label="按钮"></NButton>
    {{
      render(schema, {
        data: rootData
      })
    }}
  </Observer>
</template>
