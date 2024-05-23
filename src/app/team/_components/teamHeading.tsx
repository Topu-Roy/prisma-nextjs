import React from "react";
import { Heading } from "@/app/_components/heading";
import { Text } from "@/app/_components/text";

export default function TeamHeading() {
  return (
    <>
      <Heading className="text-center">Meet Our Team</Heading>
      <Text size="lg" muted className="px-2 text-center md:px-0">
        We write various things related to furniture, from tips and what things{" "}
        <br className="hidden md:block" />I need to pay attention to when
        choosing furniture
      </Text>
    </>
  );
}
