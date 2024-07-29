<script setup lang="ts">
import { cn } from "tailwind-variants";
import type { DialogDescriptionProps } from ".";
import { DialogDescription, useForwardProps } from "@ark-ui/vue";

const props = defineProps<DialogDescriptionProps>();

const forwarded = useForwardProps(props);
</script>
<template>
  <DialogDescription
    v-bind="forwarded"
    :class="cn('text-muted-foreground text-sm', props.class)"
    ><slot
  /></DialogDescription>
</template>
