<template>
  <div>
    <p :class="[sender === 'Announcer' ? 'text-red-800' : 'text-white']">
      <strong>{{ sender }}:</strong><span>{{ message }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
