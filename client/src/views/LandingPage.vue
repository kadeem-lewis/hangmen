<template>
  <div class="flex flex-col">
    <input
      class="border-2 border-black"
      type="text"
      name="username"
      placeholder="Enter a username"
      v-model="username"
    />
    <button
      type="submit"
      @click="register"
      class="border-black border-2 rounded-full bg-blue-200 py-1 hover:bg-blue-100 mt-2"
    >
      Play
    </button>
  </div>
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
