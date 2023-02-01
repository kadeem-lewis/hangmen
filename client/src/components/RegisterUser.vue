<template>
  <div class="flex flex-col">
    <h2 class="text-3xl">Please Enter a Username:</h2>
    <input
      class="border-2 border-black"
      type="text"
      name="username"
      v-model="username"
    />
    <button type="submit" @click="register">Play</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {},
  created() {},
};
</script>
