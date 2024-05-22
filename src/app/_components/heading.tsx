import React from "react";
import { poppins } from "@/styles/font";
import { cn } from "@/lib/utils";

export type HeadingProps = Partial<{
  className: string;
}>;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = "",
  ...restProps
}) => {
  return (
    <h2
      className={cn(
        "text-3xl font-bold text-gray-900/80 lg:text-4xl",
        poppins.className,
        className,
      )}
      {...restProps}
    >
      {children}
    </h2>
  );
};

export { Heading };
