<template>
  <div>
    <p
      :class="[
        sender === 'Announcer' ? 'text-red-500' : ' text-black dark:text-white',
      ]"
    >
      <strong>{{ sender }}:</strong
      ><span class="break-words">&nbsp;{{ message }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sender: string;
  message: string;
}>();

const { sender, message } = props;
</script>
