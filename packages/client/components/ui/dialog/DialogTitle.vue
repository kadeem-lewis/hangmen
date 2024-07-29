<script setup lang="ts">
import { useForwardProps, DialogTitle } from "@ark-ui/vue";
import type { DialogTitleProps } from ".";
import { cn } from "tailwind-variants";

const props = defineProps<DialogTitleProps>();

const forwarded = useForwardProps(props);
</script>
<template>
  <DialogTitle
    v-bind="forwarded"
    :class="
      cn('text-lg font-semibold leading-none tracking-tight', props.class)
    "
    ><slot
  /></DialogTitle>
</template>
