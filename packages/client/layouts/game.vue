<template>
  <div>
    <NavBar class="hidden md:block" />
    <main class="md:mt-16 max-w-md md:max-w-5xl m-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
