<template>
  <header class="flex justify-between md:justify-center items-center">
    <NuxtLink to="/">
      <img src="../assets/logo.svg" alt="Hangman Logo" class="h-12" />
    </NuxtLink>
    <button class="md:hidden">
      <Icon name="fa6-solid:circle-exclamation" size="2rem" />
    </button>
  </header>
</template>
<script setup lang="ts"></script>
