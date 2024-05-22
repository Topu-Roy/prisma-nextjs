import React from "react";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import { Text } from "../text";
import { Heading } from "../heading";

export default function Newsletter() {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-sm bg-black/[0.15] sm:w-[90%]">
      <div className="flex w-full flex-1 flex-col items-center justify-center space-y-4 px-4 py-4 lg:space-y-8 lg:py-8 xl:py-0">
        <div className="flex w-full flex-col items-center justify-start gap-2.5 text-center lg:text-left">
          <Heading>Subscribe now and get 10% off all items</Heading>
          <Text size="md" muted={true}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&#39;s standard dummy
            text.
          </Text>
        </div>
        <div className="flex w-full gap-2">
          <input
            name="email"
            type="email"
            placeholder="Your email here.."
            className="w-[74%] rounded-sm bg-white px-2"
          />
          <Button size="6xl" className="flex-1 rounded-sm font-bold">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="hidden flex-1 lg:block">
        <Image
          height={1000}
          width={1000}
          src="/images/img_pexels_photo_by.png"
          alt="pexelsphotoby"
          className="object-cover"
        />
      </div>
    </div>
  );
}
