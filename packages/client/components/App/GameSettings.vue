<template>
  <div>
    <form>
      <div class="flex justify-between gap-4">
        <label for="hard-mode">Hard Mode:</label>
        <input type="checkbox" name="hard-mode" id="hard-mode" />
      </div>
      <div class="flex justify-between gap-4">
        <label for="">Max word Length:</label>
        <div class="flex gap-2">
          <span
            @click="changeMinWordLength('decrement')"
            class="flex items-center border"
            :class="
              wordLength === minWordLength
                ? 'border-gray-400 text-gray-400'
                : ''
            "
            ><Icon icon="heroicons:chevron-left" :inline="true"
          /></span>
          <div class="bg-dark-mode-400">{{ wordLength }}</div>
          <span
            @click="changeMinWordLength('increment')"
            class="flex items-center border"
            :class="
              wordLength === maxWordLength
                ? 'border-gray-400 text-gray-400'
                : ''
            "
            ><Icon icon="heroicons:chevron-right" :inline="true"
          /></span>
        </div>
      </div>
      <div class="flex justify-between gap-4">
        <label for="">Number of Words per Game:</label>
        <div class="flex gap-2">
          <span
            @click="changeWordsPerGame('decrement')"
            class="flex items-center border"
            :class="wordsPerGame === 3 ? 'border-gray-400 text-gray-400' : ''"
            ><Icon icon="heroicons:chevron-left" :inline="true"
          /></span>
          <div class="bg-dark-mode-400">{{ wordsPerGame }}</div>
          <span
            @click="changeWordsPerGame('increment')"
            class="flex items-center border"
            :class="wordsPerGame === 9 ? 'border-gray-400 text-gray-400' : ''"
            ><Icon icon="heroicons:chevron-right" :inline="true"
          /></span>
        </div>
      </div>
    </form>
    <div><slot /></div>
  </div>
  <!-- TODO: add a slot in settings to wrap and style game code  -->
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
const { $io } = useNuxtApp();

const wordsPerGame = ref(3);
const minWordsPerGame = 3;
const maxWordsPerGame = 9;

const wordLength = ref(8);
const maxWordLength = 24;
const minWordLength = 8;
const isHardMode = ref(false);

const changeWordsPerGame = (action: string) => {
  if (action === "increment" && wordsPerGame.value < maxWordsPerGame) {
    wordsPerGame.value++;
  } else if (action === "decrement" && wordsPerGame.value > minWordsPerGame) {
    wordsPerGame.value--;
  }
};
const changeMinWordLength = (action: string) => {
  if (action === "increment" && wordLength.value < maxWordLength) {
    wordLength.value++;
  } else if (action === "decrement" && wordLength.value > minWordLength) {
    wordLength.value--;
  }
};

const gameSettings = useState("settings", () => ({
  wordsPerGame: wordsPerGame.value,
  minWordLength: wordLength.value,
  isHardMode: isHardMode.value,
}));
</script>
