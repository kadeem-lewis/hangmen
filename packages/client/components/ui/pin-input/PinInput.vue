<script setup lang="ts">
import {
  PinInput,
  type PinInputRootEmits,
  useForwardPropsEmits,
} from "@ark-ui/vue";
import type { PinInputProps } from ".";
import { PinInputVariants } from ".";

const { base, input } = PinInputVariants();

const props = defineProps<PinInputProps>();
const emits = defineEmits<PinInputRootEmits>();

const id = useId();

const forwarded = useForwardPropsEmits(props, emits);
</script>
<template>
  <ClientOnly>
    <PinInput.Root
      :id="id"
      placeholder="*"
      v-bind="forwarded"
      type="alphabetic"
    >
      <PinInput.Label>
        <slot name="label" />
      </PinInput.Label>
      <PinInput.Control>
        <PinInput.Input
          v-for="(item, index) in [...Array(length)]"
          :class="input()"
          :key="index"
          :index="index"
        />
      </PinInput.Control>
    </PinInput.Root>
  </ClientOnly>
</template>
