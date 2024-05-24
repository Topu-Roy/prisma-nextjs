import React from "react";
import { poppins } from "@/styles/font";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type props = {
  title: string;
  handleReset: () => void;
};

export default function HeadingAndReset({ handleReset, title }: props) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-2">
      <h3
        className={cn("text-xl font-bold text-gray-900/80", poppins.className)}
      >
        {title}
      </h3>
      <Button
        variant={"outline"}
        className="rounded-full p-2"
        onClick={() => handleReset()}
      >
        <RotateCcw />
      </Button>
    </div>
  );
}
