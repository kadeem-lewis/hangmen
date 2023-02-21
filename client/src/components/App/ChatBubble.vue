<template>
  <div>
    <p :class="[sender === 'Announcer' ? 'text-red-500' : 'text-white']">
      <strong>{{ sender }}:</strong><span>&nbsp;{{ message }}</span>
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
