import React from "react";
import { Text } from "../text";

export default function Copyright() {
  return (
    <>
      <div className="w-full bg-gray-950">
        <div className="mx-auto h-px w-[90%] bg-white/10" />
      </div>
      <div className="flex w-full flex-row items-center justify-center bg-gray-950 py-4">
        <Text size="s" className="text-white/40">
          © Copyright 2022. All Rights Reserved
        </Text>
      </div>
    </>
  );
}
