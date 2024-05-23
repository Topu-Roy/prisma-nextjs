import React from "react";
import Rating from "./rating";

type Props = {
  name: string;
  date: string;
  review: string;
  rating: number;
};

export default function Review({ name, date, rating, review }: Props) {
  return (
    <div className="mt-6 divide-y divide-gray-200">
      <div className="gap-3 py-6 sm:flex sm:items-start">
        <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
          <div className="space-y-0.5">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {name}
            </p>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {date}
            </p>
          </div>

          <div className="-mx-12">
            <Rating rate={rating} readonly={true} className="scale-75" />
          </div>

          <div className="inline-flex items-center gap-1">
            <svg
              className="text-primary-700 dark:text-primary-500 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Verified purchase
            </p>
          </div>
        </div>

        <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {review}
          </p>

          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Was it helpful to you?
            </p>
            <div className="flex items-center">
              <input
                id="reviews-radio-3"
                type="radio"
                value=""
                name="reviews-radio-2"
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
              <label
                htmlFor="reviews-radio-3"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {" "}
                Yes: 1{" "}
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="reviews-radio-4"
                type="radio"
                value=""
                name="reviews-radio-2"
                className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
              <label
                htmlFor="reviews-radio-4"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                No: 0{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
