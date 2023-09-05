<template>
  <div class="flex h-full flex-col justify-between gap-4">
    <div class="grid gap-4">
      <div class="flex justify-between">
        <AppHangmanCanvas />
        <button
          class="btn w-fit self-start text-xs lg:text-base"
          @click="skipTurn"
        >
          Skip Turn
        </button>
      </div>
      <div class="m-auto flex gap-1">
        <input
          v-for="(input, index) in inputs"
          :key="index"
          type="text"
          v-model="input.value"
          ref="inputElements"
          class="h-8 w-8 rounded-lg bg-dark-mode-400 text-center"
          maxlength="1"
          @keydown="handleKeydown($event, index)"
        />
      </div>
      <AppGameKeyboard />
    </div>
    <div class="flex justify-between gap-4"></div>
  </div>
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();

const word = ref("soon");

const inputs = ref(
  Array(word.value.length)
    .fill(0)
    .map(() => ({ value: "" })),
);

const inputElements = ref<HTMLInputElement[]>([]);

const skipTurn = () => {
  $io.emit(ClientEvents.SKIP_TURN);
};

const handleKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === "Backspace") {
    inputs.value[index].value = "";
    if (index !== 0) {
      inputElements.value[index - 1].focus();
    }
  } else if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
    event.preventDefault();
    inputs.value[index].value = event.key;

    // Use setTimeout to delay focus to next input
    if (index !== inputs.value.length - 1) {
      setTimeout(() => {
        inputElements.value[index + 1].focus();
      }, 0);
    }
  }
};

watch(word, (newValue) => {
  // Reset inputs when the word changes
  inputs.value = Array(newValue.length)
    .fill(0)
    .map(() => ({ value: "" }));
});
</script>
