<template>
  <div>
    <form>
      <div class="flex justify-between gap-4">
        <label for="hard-mode">Hard Mode:</label>
        <UCheckbox v-model="isHardMode" name="hard-mode" id="hard-mode" />
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
            ><UIcon name="i-heroicons-chevron-left"
          /></span>
          <div class="bg-gray-800">{{ wordLength }}</div>
          <span
            @click="changeMinWordLength('increment')"
            class="flex items-center border"
            :class="
              wordLength === maxWordLength
                ? 'border-gray-400 text-gray-400'
                : ''
            "
            ><UIcon name="i-heroicons-chevron-right"
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
            ><UIcon name="i-heroicons-chevron-left"
          /></span>
          <div class="bg-gray-800">{{ wordsPerGame }}</div>
          <span
            @click="changeWordsPerGame('increment')"
            class="flex items-center border"
            :class="wordsPerGame === 9 ? 'border-gray-400 text-gray-400' : ''"
            ><UIcon name="i-heroicons-chevron-right"
          /></span>
        </div>
      </div>
    </form>
    <div><slot /></div>
  </div>
  <!-- TODO: add a slot in settings to wrap and style game code  -->
</template>

<script setup lang="ts">
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
//maybe even create a reactive with multiple fields or just store the refs to a data object from spending or even just wrap in an object
const handleGameSettings = () => {
  $io.emit(ClientEvents.GAME_SETTINGS, {
    wordsPerGame: wordsPerGame.value,
    minWordLength: wordLength.value,
    isHardMode: isHardMode.value,
  });
};
</script>
