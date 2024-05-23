"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  rate: number;
  readonly: boolean;
  className?: string;
  totalStars?: number;
  setRate?: React.Dispatch<React.SetStateAction<number>>;
};

const Rating = ({
  rate,
  readonly,
  className,
  totalStars = 5,
  setRate,
}: Props) => {
  const [rating, setRating] = useState(rate);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (setRate) {
      setRate(rating);
    }
  }, [rating]);

  return (
    <div className={cn("flex space-x-1", className)}>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
              onClick={() => !readonly && setRating(ratingValue)}
            />
            <svg
              className={cn("size-6 transition-colors")}
              fill={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => !readonly && setHover(ratingValue)}
              onMouseLeave={() => !readonly && setHover(0)}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
