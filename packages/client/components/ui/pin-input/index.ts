import type { PinInputRootProps } from "@ark-ui/vue";
import { tv, type VariantProps } from "tailwind-variants";

export interface PinInputProps extends PinInputRootProps {
  length: number;
}

export const PinInputVariants = tv({
  slots: {
    base: "",
    input: "h-8 w-8 rounded-lg bg-dark-mode-400 text-center",
  },
});

export type PinInputVariantProps = VariantProps<typeof PinInputVariants>;

export { default as PinInput } from "./PinInput.vue";
