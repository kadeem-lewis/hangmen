<script setup lang="ts">
import { Dialog, useForwardProps } from "@ark-ui/vue";
import type { DialogContentProps } from "@ark-ui/vue";

const props = defineProps<DialogContentProps>();

const forwarded = useForwardProps(props);
</script>
<template>
  <Teleport to="body">
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content v-bind="forwarded">
        <slot name="title" />
        <slot name="description" />
        <slot />
      </Dialog.Content>
    </Dialog.Positioner>
  </Teleport>
</template>
