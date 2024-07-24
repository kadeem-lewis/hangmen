<script setup lang="ts">
import {
  Dialog,
  type DialogRootProps,
  type DialogRootEmits,
  useForwardPropsEmits,
} from "@ark-ui/vue";
const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
<template>
  <ClientOnly>
    <Dialog.Root v-bind="forwarded">
      <slot />
    </Dialog.Root>
  </ClientOnly>
</template>
