<template>
  <div class="grid grid-cols-9 gap-2 text-center uppercase">
    <button
      v-for="letter in alphabet"
      :key="letter"
      :disabled="false"
      @click="updateInput(letter)"
      class="rounded-lg border font-short-stack hover:bg-white hover:text-black disabled:border-gray-400"
    >
      {{ letter }}
    </button>
    <button
      @click="submitGuess"
      class="rounded-lg border font-short-stack hover:bg-white hover:text-black disabled:border-gray-400"
    >
      Enter
    </button>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();
type Input = {
  value: string;
};
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const inputs = useState<Input[]>("inputs");
const currentIndex = useState<number>("index");

const updateInput = (letter: string) => {
  if (currentIndex.value < inputs.value.length) {
    // Update the current input and move to the next one
    inputs.value[currentIndex.value].value = letter;
    currentIndex.value++;
  }
};

console.log(inputs.value[0].value);

const submitGuess = () => {
  currentIndex.value = 0;
  $io.emit(ClientEvents.SEND_GUESS, inputs.value[0].value);
};
</script>
