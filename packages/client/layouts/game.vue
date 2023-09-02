<template>
  <div>
    <NavBar class="hidden md:flex" />
    <UContainer as="main" class="md:mt-8">
      <slot />
    </UContainer>
  </div>
</template>

<script setup lang="ts"></script>
