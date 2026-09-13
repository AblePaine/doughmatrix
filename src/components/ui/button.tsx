import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out select-none disabled:opacity-40 disabled:pointer-events-none active:not-disabled:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-inverse hover:bg-accent-hover shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)]",
        secondary:
          "bg-card text-fg shadow-[0_0_0_1px_var(--color-border)] hover:shadow-[0_0_0_1px_var(--color-border-strong)]",
        ghost: "bg-transparent text-muted hover:text-fg hover:bg-card",
        danger:
          "bg-danger/15 text-danger shadow-[0_0_0_1px_rgb(248_113_113_/_0.35)] hover:bg-danger/25",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-sm",
        md: "h-11 px-4 text-sm rounded-md",
        lg: "h-12 px-5 text-base rounded-md",
        icon: "size-11 rounded-md",
        paddle: "size-20 rounded-lg text-2xl",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
