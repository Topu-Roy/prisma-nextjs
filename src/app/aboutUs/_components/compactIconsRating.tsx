import { Heading } from "@/app/_components/heading";
import Image from "next/image";
import React from "react";

export default function CompactIconsRating() {
  const userIconsForRating = [
    "img_unsplash_wnolnjo7ts8.png",
    "img_unsplash_rtvgs4vgkgm.png",
    "img_unsplash_d1upkifd04a.png",
    "img_unsplash_plsf6obtgms.png",
  ];

  return (
    <div className="flex w-full flex-row justify-center">
      {userIconsForRating.map((icon) => (
        <Image
          key={`${icon}-icon`}
          src={`/images/${icon}`}
          alt=""
          className="h-[50px] w-[50px] rounded-[50%]"
          height={50}
          width={50}
        />
      ))}
      <div className=" flex h-[50px] w-[50px] flex-col items-center justify-start pl-8">
        <Heading className="flex h-[50px] w-[50px] items-center justify-center rounded-[50%] text-center">
          3K+
        </Heading>
      </div>
    </div>
  );
}
