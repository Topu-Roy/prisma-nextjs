"use client";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type TestimonialsArrayType } from "../../../assets/testimonialsArray";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/app/_components/heading";
import { Text } from "@/app/_components/text";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useDeviceWidth from "@/hooks/windowDimensions";
import { Quote } from "lucide-react";

type Props = {
  testimonials: TestimonialsArrayType[];
};

const TestimonialCard = ({ item }: { item: TestimonialsArrayType }) => (
  <div className="my-10 flex h-[20rem] w-[97%] mx-auto flex-col items-center justify-between gap-5 rounded-md border bg-stone-300/50 p-4">
    <Text size="xl" className="font-semibold text-center lg:text-left">
      {item.headline}
    </Text>
    <div className="flex w-full flex-col items-center justify-between gap-2">
      <div className="space-y-1">
        <div className="flex items-center justify-start">
          <Quote />
        </div>
        <Text size="md" className="opacity-0.5 line-clamp-4">
          {item.text}
        </Text>
        <div className="flex items-center justify-end">
          <Quote className="rotate-180" />
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-start gap-4">
        <Avatar className="h-14 w-14 rounded-full">
          <AvatarImage src={item.imageURL} />
          <AvatarFallback>{item.name}</AvatarFallback>
        </Avatar>
        <div className="flex w-4/5 flex-col items-start justify-start gap-1">
          <Text size="md" className="font-medium">
            {item.name}
          </Text>
          <Text muted size="s">
            {item.location}
          </Text>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = ({ testimonials }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const deviceWidth = useDeviceWidth();

  useEffect(() => {
    if (deviceWidth < 1024) {
      setItemsPerSlide(1);
    } else if (deviceWidth > 1024 && deviceWidth < 1280) {
      setItemsPerSlide(2); // Smaller screens
    } else {
      setItemsPerSlide(3); // Bigger screens
    }
  }, [deviceWidth]);

  useEffect(() => {
    if (!api) return;

    const numberOfPages = Math.ceil(testimonials.length / itemsPerSlide);
    setCount(numberOfPages);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, itemsPerSlide, testimonials.length]);

  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
    groupedTestimonials.push(testimonials.slice(i, i + itemsPerSlide));
  }

  const handlePageChange = (pageIndex: number) => {
    api?.scrollTo(pageIndex);
    setCurrent(pageIndex + 1);
  };

  const renderPaginationItems = () => {
    const items = [];

    if (current > 1) {
      items.push(
        <PaginationItem key="prev">
          <PaginationPrevious onClick={() => handlePageChange(current - 2)} />
        </PaginationItem>
      );
    }

    for (let i = 0; i < count; i++) {
      if (i >= current - 1 && i <= current + 1) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === current - 1}
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if (current < count - 2) {
      items.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (current < count) {
      items.push(
        <PaginationItem key="next">
          <PaginationNext onClick={() => handlePageChange(current)} />
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="mx-auto my-auto flex flex-col items-center justify-center bg-slate-300/50 pb-10 md:pb-14 lg:pb-16">
      <Heading className="text-center py-10 md:py-14 lg:py-16">Hear from our customers</Heading>
      <Carousel
        setApi={setApi}
        className="mx-auto w-[75%]"
        plugins={[Autoplay({ delay: 10000 })]}
      >
        <CarouselContent>
          {groupedTestimonials.map((group, index) => (
            <CarouselItem key={index}>
              <div className="my-auto flex h-full flex-row items-center justify-between gap-4">
                {group.map((item) => (
                  <TestimonialCard key={item.name + item.imageURL} item={item} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Pagination>
        <PaginationContent>{renderPaginationItems()}</PaginationContent>
      </Pagination>
    </div>
  );
};

export default Testimonials;
