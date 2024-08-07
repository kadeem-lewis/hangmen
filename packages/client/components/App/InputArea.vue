<template>
  <form class="relative flex" @submit.prevent="onSubmit">
    <UInput
      id="chat-input"
      v-model="chatInput"
      placeholder="Enter Message..."
      class="w-full"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          icon="i-heroicons-paper-airplane"
          variant="ghost"
          type="submit"
        />
      </template>
    </UInput>
  </form>
</template>
<script setup lang="ts">
const { sendMessage } = useRoomStore();

const chatInput = ref("");

function onSubmit() {
  sendMessage(chatInput.value);
  chatInput.value = "";
}
</script>
