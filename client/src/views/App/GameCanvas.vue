<template>
  <div class="flex flex-col">
    <div>
      <span><font-awesome-icon icon="fa-solid fa-clock" /></span>
      <span>30s</span>
    </div>
    <p class="text-center text-3xl">Player's Turn</p>
  </div>
  <div>The Game</div>
  <div class="flex">
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
    >
      Guess Letter
    </button>
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
    >
      Guess Word
    </button>
    <button
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/3"
    >
      Skip Turn
    </button>
  </div>
</template>
