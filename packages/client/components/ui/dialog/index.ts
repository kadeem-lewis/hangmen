import { Dialog } from "@ark-ui/vue";
import { tv, type VariantProps } from "tailwind-variants";

const DialogVariants = tv({
  base: "fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50",
});

export type DialogVariantProps = VariantProps<typeof DialogVariants>;

export const DialogTrigger = Dialog.Trigger;
export { default as Dialog } from "./Dialog.vue";
export { default as DialogContent } from "./DialogContent.vue";
