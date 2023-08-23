<template>
  <div>
    <NavBar class="hidden md:flex" />
    <main class="md:mt-8 max-w-md md:max-w-5xl m-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
