<template>
  <div>
    <NavBar class="hidden md:flex" />
    <main class="m-auto max-w-md md:mt-8 md:max-w-5xl">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
