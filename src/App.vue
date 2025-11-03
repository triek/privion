<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
:global(body) {
  @apply bg-slate-950;
}
</style>
