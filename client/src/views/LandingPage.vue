<template>
  <form class="flex flex-col">
    <input
      class="bg-dark-mode-400 rounded-sm px-4 py-2 outline-none mx-2"
      type="text"
      name="username"
      placeholder="Enter a username"
      v-model="username"
    />
    <button
      type="submit"
      @click="register"
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 mt-2 font-semibold text-xl w-3/4 mx-auto"
    >
      Play
    </button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    register() {
      // TODO: Send Data to server using socket.io
      this.$router.push("/mode");
    },
  },
};
</script>
