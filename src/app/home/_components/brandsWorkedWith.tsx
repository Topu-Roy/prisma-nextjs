import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function BrandsWorkedWith() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-10 bg-gray-900 py-10 sm:py-12 md:py-14 lg:py-16">
      <Marquee className="mx-auto flex w-full max-w-7xl flex-row justify-between">
        <Image
          src="images/img_search_gray_50_01.svg"
          alt=""
          className="mr-8 h-12 sm:mr-10 lg:mr-20"
          height={50}
          width={250}
        />
        <Image
          src="images/img_company_logo_company109.svg"
          alt=""
          className="mr-8 h-12 sm:mr-10 lg:mr-20"
          height={50}
          width={150}
        />
        <Image
          src="images/img_company_logo_company109_gray_50_01.svg"
          alt=""
          className="mr-8 h-12 sm:mr-10 lg:mr-20"
          height={50}
          width={80}
        />
        <Image
          src="images/img_company_logo_company109_gray_50_01_48x141.svg"
          alt=""
          className="mr-8 h-12 sm:mr-10 lg:mr-20"
          height={50}
          width={120}
        />
        <Image
          src="images/img_company_logo_company109_gray_50_01_48x134.svg"
          alt=""
          className="mr-8 h-12 sm:mr-10 lg:mr-20"
          height={50}
          width={120}
        />
        <Image
          src="images/img_company_logo_company109_gray_50_01_48x132.svg"
          alt=""
          className="mr-8 h-12 sm:mr-10 lg:mr-20"
          height={50}
          width={110}
        />
      </Marquee>
    </section>
  );
}
