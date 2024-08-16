<template>
  <div class="flex items-center justify-between text-black dark:text-white">
    <div class="flex">
      <b>{{ sender }}:</b>
      <p class="break-words">&nbsp;{{ text }}</p>
    </div>
    <span class="text-xs">{{ time }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sender: string;
  text: string;
  time: string;
}>();
</script>
