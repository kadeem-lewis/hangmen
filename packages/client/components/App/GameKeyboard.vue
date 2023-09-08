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
  </div>
</template>

<script setup lang="ts">
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
</script>
