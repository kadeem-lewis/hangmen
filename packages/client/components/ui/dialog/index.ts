import { Dialog } from "@ark-ui/vue";
import type {
  DialogTitleProps as ArkDialogTitleProps,
  DialogDescriptionProps as ArkDialogDescriptionProps,
} from "@ark-ui/vue";

export interface DialogTitleProps extends ArkDialogTitleProps {
  class?: string;
}

export interface DialogDescriptionProps extends ArkDialogDescriptionProps {
  class?: string;
}

export const DialogTrigger = Dialog.Trigger;
export { default as Dialog } from "./Dialog.vue";
export { default as DialogContent } from "./DialogContent.vue";
export { default as DialogTitle } from "./DialogTitle.vue";
export { default as DialogDescription } from "./DialogDescription.vue";
