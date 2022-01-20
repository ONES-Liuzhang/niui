<template>
  <div>
    <p>Nav</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  b: String
});

console.log(props.b);
</script>
