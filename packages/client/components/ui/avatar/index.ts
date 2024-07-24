import { tv, type VariantProps } from "tailwind-variants";
import type { AvatarRootProps } from "@ark-ui/vue";

export interface AvatarProps extends AvatarRootProps {
  src: string;
  name: string;
  class?: string;
  size?: "sm" | "md" | "lg";
}

//TODO: Setup responsive styles
export const AvatarVariants = tv({
  base: "select-none",
  variants: {
    size: {
      sm: "w-12 h-12",
      md: "w-24 h-24",
      lg: "w-32 h-32",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type AvatarVariantProps = VariantProps<typeof AvatarVariants>;

export { default as Avatar } from "./Avatar.vue";
