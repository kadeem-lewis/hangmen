<template>
  <div>
    <form>
      <div>
        <label for="hard-mode">Hard Mode</label>
        <input type="checkbox" name="hard-mode" id="hard-mode" />
      </div>
      <div>
        <label for="">Max word Length</label>
        <div class="flex">
          <span @click="minWordLength--" class="border rounded-md">-</span>
          <div>{{ minWordLength }}</div>
          <span @click="minWordLength++" class="border rounded-md">+</span>
        </div>
      </div>
      <div>
        <label for="">Number of Words per Game</label>
        <div class="flex">
          <span @click="wordsPerGame--" class="border rounded-md">-</span>
          <div>{{ wordsPerGame }}</div>
          <span @click="wordsPerGame++" class="border rounded-md">+</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();
const wordsPerGame = ref(3);
const minWordLength = ref(8);
const isHardMode = ref(false);

//maybe even create a reactive with multiple fields or just store the refs to a data object from spending or even just wrap in an object
const handleGameSettings = () => {
  $io.emit(ClientEvents.GAME_SETTINGS, {
    wordsPerGame,
    minWordLength,
    isHardMode,
  });
};
</script>
