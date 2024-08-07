<template>
  <UCard class="flex flex-col justify-between">
    <div class="max-h-64 grow overflow-y-auto">
      <AppChatBubble
        v-for="message in messages"
        :key="message.id"
        v-bind="message"
      />
    </div>
    <template #footer>
      <AppInputArea />
    </template>
  </UCard>
</template>
<script setup lang="ts">
const { messages } = storeToRefs(useRoomStore());

onBeforeUnmount(() => {
  messages.value = [];
});
</script>
