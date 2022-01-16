<script setup lang="ts">
import RootRenerer from './RootRenderer.vue';
import { RootProps } from './Root';
import { provide } from 'vue';

const props = defineProps<RootProps>();
const {
  schema,
  rootStore,
  env,
  theme,
  pathPrefix = '',
  data,
  ...restProps
} = props;
provide('rootStore', rootStore);
</script>

<template>
  <div>
    <RootRenerer
      :schema="schema"
      :rootStore="rootStore"
      :pathPrefix="pathPrefix"
      :env="env"
      :data="data"
      v-bind="restProps"
    />
  </div>
</template>

<style scoped lang="scss"></style>
