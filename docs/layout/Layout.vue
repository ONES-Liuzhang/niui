<template>
  <div class="layout">
    <header class="header">NIUI</header>
    <div class="aside">
      <Nav />
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from './Nav.vue';
</script>

<style scoped lang="scss">
.layout {
  position: relative;
  height: 100%;
  width: 100%;

  .header {
    position: absolute;
    height: 60px;
    width: 100%;
    top: 0;
    background-color: #f66;
  }

  .aside {
    position: absolute;
    width: 200px;
    left: 0;
    top: 60px;
    bottom: 0px;
    background-color: #666;
  }

  .main {
    position: absolute;
    left: 200px;
    top: 60px;
    bottom: 0px;
  }
}
</style>
