<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
html {
  overflow-y: auto;
}

body {
  font-family: 'Roboto', sans-serif;
}
</style>
