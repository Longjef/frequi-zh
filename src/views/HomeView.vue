<template>
  <div class="home">
    <div class="d-flex justify-content-center">
      <bot-list />
    </div>
  </div>
</template>

<script setup lang="ts">
import BotList from '@/components/BotList.vue';
</script>

<style lang="scss" scoped>
.home {
  margin-top: 1.5em;
}
.logo-svg {
  -webkit-mask: url(../assets/freqtrade-logo-mask.png) no-repeat center;
  -webkit-mask-size: 240px 240px;
  mask: url(../assets/freqtrade-logo-mask.png) no-repeat center;
  mask-size: contain;
  width: 250px;
  height: 250px;
}
</style>
