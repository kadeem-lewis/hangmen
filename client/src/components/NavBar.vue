<template>
  <header>
    <img src="../assets/logo.svg" alt="Hangman Logo" />
    <!-- <div class="flex flex-row justify-center my-2">
      <p
        v-for="(letter, index) in logo"
        :class="[
          index === 3 ? 'text-black' : 'text-white',
          'w-fit',
          'border-b-2',
          'border-b-white',
          'font-bold',
          'text-4xl',
          'mx-2',
          'px-1',
        ]"
      >
        {{ letter }}
      </p>
    </div> -->
  </header>
</template>
<script>
export default {
  data() {
    return {
      logo: ["H", "A", "N", "G", "M", "A", "N"],
    };
  },
};
</script>
