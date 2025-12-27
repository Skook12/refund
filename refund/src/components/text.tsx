import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("", {
  variants: {
    variant: {
      "heading-lg": "text-4xl leading-5 font-bold",
      "heading-medium": "text-2xl leading-5 font-bold",
      "heading-xl": "text-lg leading-5 font-normal",
      "heading-small-semi-bold": "text-sm font-semibold leading-6",
      "heading-small": "text-sm font-normal leading-6",
      "paragraph-medium": "text-[16px] leading-4 font-bold",
      "paragraph-medium-normal": "text-[16px] leading-4 font-normal",
      "paragraph-small": "text-sm leading-4 font-normal",
      "pagination-label": "text-[16px] font-normal leading-5",
      "label-input": "text-lg",
    },
  },
  defaultVariants: {
    variant: "paragraph-medium",
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "span",
  variant,
  className,
  children,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children
  );
}
