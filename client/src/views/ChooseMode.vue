<template>
  <h1>Choose Mode</h1>
  <button @click="createGame">Create Game</button>
  <input type="text" ref="gameCode" />
  <button @click="joinGame">Join Game</button>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    createGame() {
      this.$router.push("/game/lobby");
    },
    joinGame() {
      this.$router.push("/game/lobby");
    },
  },
};
</script>
