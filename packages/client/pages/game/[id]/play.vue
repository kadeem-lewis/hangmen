<template>
  <div class="grid gap-4">
    <AppHangmanCanvas />
    <div class="m-auto flex gap-1">
      <input
        v-for="(input, index) in inputs"
        :key="index"
        type="text"
        v-model="input.value"
        ref="inputElements"
        class="h-8 w-8 rounded-lg bg-dark-mode-400 text-center"
        maxlength="1"
        @focus="setCurrentIndex(index)"
        @keydown="handleKeydown($event, index)"
      />
    </div>
    <AppGameKeyboard />
  </div>
  <!-- <div class="flex justify-between gap-4">
      <button
        class="btn w-fit self-start text-xs lg:text-base"
        @click="skipTurn"
      >
        Skip Turn
      </button>
    </div> -->
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();

const wordToGuess = useState<string[]>("wordToGuess");
const currentIndex = useState("index", () => 0);

const inputs = useState("inputs", () =>
  Array(wordToGuess.value.length)
    .fill(0)
    .map(() => ({ value: "" })),
);

const inputElements = ref<HTMLInputElement[]>([]);

const skipTurn = () => {
  $io.emit(ClientEvents.SKIP_TURN);
};

const setCurrentIndex = (index: number) => {
  currentIndex.value = index;
};

const handleKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key !== "Tab") {
    event.preventDefault();
  }
  if (event.key === "ArrowRight" && index < inputs.value.length - 1) {
    // Focus the next input on ArrowRight
    inputElements.value[index + 1].focus();
    currentIndex.value = index + 1;
    return;
  } else if (event.key === "ArrowLeft" && index > 0) {
    // Focus the previous input on ArrowLeft
    inputElements.value[index - 1].focus();
    currentIndex.value = index - 1;
    return;
  }
  if (event.key === "Backspace") {
    inputs.value[index].value = "";
    if (index !== 0) {
      inputElements.value[index - 1].focus();
    }
    return;
  }
  if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
    inputs.value[index].value = event.key;

    if (index !== inputs.value.length - 1) {
      inputElements.value[index + 1].focus();
    } else {
      inputElements.value[index].blur();
    }
  }
};

watch(wordToGuess, (newValue) => {
  // Reset inputs when the word changes
  inputs.value = Array(newValue.length)
    .fill(0)
    .map(() => ({ value: "" }));
});
watch(currentIndex, (newValue) => {
  if (newValue >= 0 && newValue < inputElements.value.length) {
    inputElements.value[newValue].focus();
  }
});

onMounted(() => {
  $io.on(ServerEvents.GAME_UPDATE, (word) => {
    wordToGuess.value = word;
  });
});

//TODO: currently conflicts with leave game button if on play page, should be modal
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    "Do you really want to leave? you have unsaved changes!",
  );
  if (!answer) return false;
});
</script>
