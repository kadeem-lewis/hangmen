<template>
  <div class="container text-white min-h-screen m-auto bg-dark-mode-600">
    <NavBar />
    <main class="mt-16 max-w-md md:max-w-3xl m-auto">
      <NuxtPage />
    </main>
  </div>
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();

$io.connect();
</script>
<style>
body {
  @apply bg-dark-mode-600;
}
</style>
