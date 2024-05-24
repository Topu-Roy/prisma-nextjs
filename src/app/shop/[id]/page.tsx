import React from "react";
import { Text } from "@/app/_components/text";
import Image from "next/image";
import Rating from "./_components/rating";
import Review from "./_components/review";
import { cn } from "@/lib/utils";
import ReviewByRateItem from "./_components/reviewByRateItem";
import ProductAddToCart from "./_components/productAddToCart";
import RelatedProducts from "./_components/relatedProducts";
import dynamic from "next/dynamic";
import Chip from "@/app/cart/_components/chip";
import { getProductByIdWithReviews, getProductReviewCountByRating } from "@/actions/productAction";
const CreateReview = dynamic(() => import("./_components/createReview"), { ssr: false });

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductByIdWithReviews({ id: params.id });

  const oneStarReviews = await getProductReviewCountByRating({ productId: params.id, rate: 1 });
  const twoStarReviews = await getProductReviewCountByRating({ productId: params.id, rate: 2 });
  const threeStarReviews = await getProductReviewCountByRating({ productId: params.id, rate: 3 });
  const fourStarReviews = await getProductReviewCountByRating({ productId: params.id, rate: 4 });
  const fiveStarReviews = await getProductReviewCountByRating({ productId: params.id, rate: 5 });

  const totalReviews = oneStarReviews + twoStarReviews + threeStarReviews + fourStarReviews + fiveStarReviews;
  const totalStars = oneStarReviews * 1 + twoStarReviews * 2 + threeStarReviews * 3 + fourStarReviews * 4 + fiveStarReviews * 5;
  const averageRating_Float = totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : 0;
  const averageRating_round = Math.round(parseInt(averageRating_Float + ''));

  if (!product || product === null) {
    return (
      <Text className="mx-auto mt-[6rem] w-full max-w-7xl text-center">
        Product Not Found
      </Text>
    );
  }

  const formatDate = (dateStr: Date) => {
    const date = new Date(dateStr);
    const withComma = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return withComma.replace(",", " ");
  };

  return (
    <>
      <section className="mt-[4rem] bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="mx-auto max-w-md shrink-0 overflow-hidden rounded-md lg:max-w-lg">
              <Image
                height={1000}
                width={1000}
                className="w-full"
                src={product.image ?? ""}
                alt={product.productTitle}
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                {product.productTitle}
              </h1>
              <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  ${product.price}
                </p>

                <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  <Rating
                    rate={Math.floor(averageRating_round)}
                    className={"-mx-4 scale-75"}
                    readonly={true}
                  />
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    ({averageRating_Float})
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    ({totalReviews}) Reviews
                  </a>
                </div>
              </div>

              <ProductAddToCart
                price={product.price}
                productId={product.id}
                productTitle={product.productTitle}
              />

              <hr className="my-6 border-gray-200 dark:border-gray-800 md:my-8" />
              <div className="flex items-center justify-start gap-2 py-2">
                {product.color ? <Chip text={product.color} /> : null}
                {product.category ? <Chip text={product.category} /> : null}
                {product.status ? <Chip text={product.status} /> : null}
                {product.tag ? <Chip text={product.tag} /> : null}
              </div>
              {/* //TODO: Add Product description */}
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                Studio quality three mic array for crystal clear calls and voice
                recordings. Six-speaker sound system for a remarkably robust and
                high-quality audio experience. Up to 256GB of ultrafast SSD
                storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Reviews
            </h2>

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <Rating rate={4} readonly={true} className="-mr-4 scale-75" />
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({averageRating_Float})
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                {" "}
                {totalReviews} Reviews{" "}
              </a>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {averageRating_Float} out of 5
              </p>
              <CreateReview
                productId={product.id}
                productTitle={product.productTitle}
              />
            </div>

            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              <ReviewByRateItem rate={5} totalReviews={totalReviews} count={fiveStarReviews} />
              <ReviewByRateItem rate={4} totalReviews={totalReviews} count={fourStarReviews} />
              <ReviewByRateItem rate={3} totalReviews={totalReviews} count={threeStarReviews} />
              <ReviewByRateItem rate={2} totalReviews={totalReviews} count={twoStarReviews} />
              <ReviewByRateItem rate={1} totalReviews={totalReviews} count={oneStarReviews} />
            </div>
          </div>

          {product.review.length > 0 ? (
            <>
              {product.review.map((review, index) => (
                <div
                  className={cn(
                    "border-t-2 border-black/10",
                    index === product.review.length - 1
                      ? "border-b-2 border-black/10"
                      : "",
                  )}
                  key={review.id}
                >
                  <Review
                    date={formatDate(review.date)}
                    name={review.name}
                    rating={review.rate}
                    review={review.text}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="text-center border-t-2 border-b-2 border-black/10 py-8">
              <Text size="md" className="py-8 font-medium" muted>No reviews</Text>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        <RelatedProducts
          productCategory={product.category}
          description={product.description}
          price={product.price}
          productId={product.id}
          productImage={product.image ?? ""}
          productTitle={product.productTitle}
        />
      </div>
    </>
  );
}
