import React from "react";
import { inter } from "@/styles/font";
import { cn } from "@/lib/utils";

const sizes = {
  s: "text-xs sm:text-sm font-normal",
  xs: "text-xs sm:text-sm font-normal",
  md: "text-sm sm:text-base lg:text-lg font-normal leading-[19px]",
  lg: "text-base sm:text-lg lg:text-xl font-normal",
  xl: "text-lg sm:text-xl font-normal",
  max: "text-xl sm:text-2xl font-bold",
};

export type TextProps = Partial<{
  className: string;
  muted: boolean;
  size: keyof typeof sizes;
}>;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  muted = false,
  size = "md",
  ...restProps
}) => {
  return (
    <p
      className={cn("text-gray-950", sizes[size], className, inter.className, {
        "text-gray-500": muted,
      })}
      {...restProps}
    >
      {children}
    </p>
  );
};

export { Text };
