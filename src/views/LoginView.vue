<template>
  <div class="container">
    <b-card header="添加后端">
      <Login ref="loginForm" />
    </b-card>
  </div>
</template>

<script setup lang="ts">
import Login from '@/components/BotLogin.vue';
</script>

<style scoped>
.container {
  max-width: 520px;
}
</style>
