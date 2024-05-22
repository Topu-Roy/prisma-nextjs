import React from "react";
import Image from "next/image";
import { Heading } from "@/app/_components/heading";
import { Text } from "@/app/_components/text";
import { ListRestart, PhoneForwarded, Rocket, ShieldCheck } from "lucide-react";

export default function OurBenefits() {
  const features = [
    {
      id: 1,
      title: "Fast Shipping",
      icon: <Rocket />,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has",
    },
    {
      id: 2,
      title: "Safe Delivery",
      icon: <ShieldCheck />,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has",
    },
    {
      id: 3,
      title: "365 Days Return",
      icon: <ListRestart />,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has",
    },
    {
      id: 4,
      title: "24 hours CS",
      icon: <PhoneForwarded />,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has",
    },
  ];

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-2 py-14 md:py-20">
        <Heading className="pb-10 text-center">
          We guarantee the safety of your shopping
        </Heading>
        <div className="flex h-full w-full flex-row justify-between">
          <div className="flex w-full flex-col items-center justify-start gap-[50px] px-2 sm:px-4 lg:flex-1">
            <div className="grid h-full w-full grid-cols-2 justify-center gap-1.5">
              {features.map((item) => (
                <div
                  key={`${item.id}-features`}
                  className="flex w-full flex-col items-start justify-start gap-10 rounded-md bg-slate-300/50 p-4"
                >
                  {item.icon}
                  <div className="flex w-full flex-col items-start justify-start gap-[9px]">
                    <Text
                      size="lg"
                      className="font-semibold tracking-[-0.50px]"
                    >
                      {item.title}
                    </Text>
                    <Text className="leading-[25px] tracking-[-0.50px] !text-gray-500">
                      {item.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden w-[50%] items-center justify-center overflow-hidden rounded-md object-cover lg:flex xl:w-[35%]">
            <Image
              height={1000}
              width={1000}
              src="/images/img_rectangle_16.png"
              alt="image_one"
              className="hidden w-full scale-110 object-cover lg:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
