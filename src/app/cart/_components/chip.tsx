import React from "react";
import { Text } from "@/app/_components/text";

export default function Chip({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-zinc-400/30 px-2 py-1">
      <Text size="xs">{text}</Text>
    </div>
  );
}
