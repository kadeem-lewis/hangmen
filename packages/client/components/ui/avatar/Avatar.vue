<script setup lang="ts">
import { Avatar, useForwardPropsEmits } from "@ark-ui/vue";
import type { AvatarRootEmits } from "@ark-ui/vue";
import { AvatarVariants, type AvatarProps } from ".";

const props = defineProps<AvatarProps>();
const emits = defineEmits<AvatarRootEmits>();
const id = useId();

const forwarded = useForwardPropsEmits(props, emits);

const getInitial = computed(() => props.name.trim().charAt(0).toUpperCase());
</script>

<template>
  <ClientOnly>
    <Avatar.Root
      :id="id"
      v-bind="forwarded"
      :class="AvatarVariants({ class: props.class, size: props.size })"
    >
      <Avatar.Fallback>{{ getInitial }}</Avatar.Fallback>
      <Avatar.Image :src="props.src" :alt="`${props.name} Avatar`" />
    </Avatar.Root>
  </ClientOnly>
</template>
