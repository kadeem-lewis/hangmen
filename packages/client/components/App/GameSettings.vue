<template>
  <div>
    <form>
      <div class="flex gap-4 justify-between">
        <label for="hard-mode">Hard Mode:</label>
        <input type="checkbox" name="hard-mode" id="hard-mode" />
      </div>
      <div class="flex gap-4 justify-between">
        <label for="">Max word Length:</label>
        <div class="flex gap-2">
          <span @click="minWordLength--" class="border flex items-center"
            ><Icon name="akar-icons:triangle-left"
          /></span>
          <div class="bg-dark-mode-400">{{ minWordLength }}</div>
          <span @click="minWordLength++" class="border flex items-center"
            ><Icon name="akar-icons:triangle-right"
          /></span>
        </div>
      </div>
      <div class="flex gap-4 justify-between">
        <label for="">Number of Words per Game:</label>
        <div class="flex gap-2">
          <span @click="wordsPerGame--" class="border flex items-center"
            ><Icon name="akar-icons:triangle-left"
          /></span>
          <div class="bg-dark-mode-400">{{ wordsPerGame }}</div>
          <span @click="wordsPerGame++" class="border flex items-center"
            ><Icon name="akar-icons:triangle-right"
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
const minWordLength = ref(8);
const isHardMode = ref(false);

//maybe even create a reactive with multiple fields or just store the refs to a data object from spending or even just wrap in an object
const handleGameSettings = () => {
  $io.emit(ClientEvents.GAME_SETTINGS, {
    wordsPerGame: wordsPerGame.value,
    minWordLength: minWordLength.value,
    isHardMode: isHardMode.value,
  });
};
</script>
