<script setup lang="ts">
import { Dialog, useForwardProps } from "@ark-ui/vue";
import type { DialogContentProps } from "@ark-ui/vue";

const props = defineProps<DialogContentProps>();

const forwarded = useForwardProps(props);
</script>
<template>
  <Teleport to="body">
    <Dialog.Backdrop class="fixed inset-0 bg-black/80 blur-sm" />
    <Dialog.Positioner
      class="fixed left-[50%] top-[50%] flex w-screen translate-x-[-50%] translate-y-[-50%] justify-center overflow-auto"
    >
      <Dialog.Content
        v-bind="forwarded"
        class="relative w-full max-w-lg rounded-sm border p-6 shadow-lg sm:rounded-lg"
      >
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          <slot name="header" />
        </div>
        <slot />
        <Dialog.CloseTrigger
          class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <Icon name="mdi:close" />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Teleport>
</template>
