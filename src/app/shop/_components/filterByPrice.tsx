"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import useDebounce from "@/hooks/debounce";
import HeadingAndReset from "./headingAndReset";
import { scrollToTop } from "@/lib/utils";
import { useShopStore } from "@/zustand/shop/shopStore";

export default function FilterByPrice() {
  const [sliderValue, setSliderValue] = useState(2000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const debouncedSliderPrice = useDebounce(sliderValue);
  const debouncedMinPrice = useDebounce(minPrice);
  const debouncedMaxPrice = useDebounce(maxPrice);

  const {
    selectedMinPrice,
    selectedMaxPrice,
    selectedSliderPrice,
    setSelectedSliderPrice,
    setSelectedMinPrice,
    setSelectedMaxPrice,
  } = useShopStore((store) => store);

  const handleMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseInt(inputValue.replace(/\D/g, ""));
    if (!isNaN(numericValue)) {
      setMinPrice(numericValue);
    } else {
      setMinPrice(0);
    }
  };

  const handleMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseInt(inputValue.replace(/\D/g, ""));
    if (!isNaN(numericValue)) {
      setMaxPrice(numericValue);
    } else {
      setMaxPrice(0);
    }
  };

  function handleReset() {
    setSelectedMinPrice(0);
    setSelectedMaxPrice(2000);
    setSelectedSliderPrice(2000);

    scrollToTop();
  }

  useEffect(() => {
    function updateValues() {
      if (selectedMaxPrice !== 2000 && selectedMinPrice !== 0) {
        setSliderValue(2000);
        setSelectedSliderPrice(sliderValue);
      }
    }

    updateValues();
  }, [selectedMaxPrice, selectedMinPrice, sliderValue]);

  useEffect(() => {
    function updateValues() {
      if (selectedSliderPrice !== 2000) {
        setMinPrice(0);
        setMaxPrice(2000);

        setSelectedMinPrice(minPrice);
        setSelectedMaxPrice(maxPrice);
      }
    }

    updateValues();
  }, [selectedSliderPrice, minPrice, maxPrice]);

  useEffect(() => {
    function updateValues() {
      setMinPrice(selectedMinPrice);
      setMaxPrice(selectedMaxPrice);
      setSliderValue(selectedSliderPrice);
    }

    updateValues();
  }, [selectedMaxPrice, selectedMinPrice, selectedSliderPrice]);

  useEffect(() => {
    function updatePrice() {
      setSelectedMinPrice(debouncedMinPrice);
      setSelectedMaxPrice(debouncedMaxPrice);
      setSelectedSliderPrice(debouncedSliderPrice);
    }

    updatePrice();
  }, [debouncedMaxPrice, debouncedMinPrice, debouncedSliderPrice]);

  return (
    <div className="flex flex-col gap-4">
      <HeadingAndReset title="Filter By Price" handleReset={handleReset} />
      <div className="flex flex-row items-center justify-center gap-1">
        <div className="flex items-center justify-center gap-2 border-[1px] border-black bg-gray-50 pl-1.5 ">
          <span className="">Min $:</span>
          <Input
            value={minPrice}
            onChange={handleMinPrice}
            placeholder="500"
            className="flex-1 rounded-[0px]"
          />
        </div>
        <div className="flex items-center justify-center gap-2 border-[1px] border-black bg-gray-50 pl-1.5 ">
          <span className="">Max $:</span>
          <Input
            value={maxPrice}
            onChange={handleMaxPrice}
            placeholder="2000"
            className="flex-1 rounded-[0px]"
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <span className="">$0</span>
        <Slider
          defaultValue={[sliderValue]}
          value={[sliderValue]}
          onValueChange={(val) => setSliderValue(val[0] ?? 0)}
          className="flex-1"
          max={2000}
          step={1}
        />
        <span className="">${sliderValue}</span>
      </div>
    </div>
  );
}
