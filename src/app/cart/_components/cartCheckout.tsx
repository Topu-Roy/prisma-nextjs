"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { type CartProduct } from "@prisma/client";
import { useCartStore } from "@/zustand/cart/cartStore";
import Link from "next/link";

export default function CartCheckout() {
  const [productsToRender, setProductsToRender] = useState<CartProduct[]>([]);

  const [summary, setSummary] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
    logisticsFee: 0,
    shippingCost: 0,
    total: 0,
  });
  const [taxRate] = useState<number>(0.09); // 9% tax rate
  const [logisticsRate] = useState<number>(0.02); // 2% logistics fee
  const [shippingCostPerProduct] = useState<number>(50.0); // $50 per product for shipping
  const [discountRate] = useState<number>(0.02); // 2% discount

  const products_store = useCartStore((store) => store.products);

  useEffect(() => {
    let subTotal = 0;
    const selectedProducts = products_store.filter(
      (product) => product.isSelected === true,
    );
    selectedProducts.forEach((item) => {
      const priceWithQuantity = item.price * item.quantity;
      subTotal += priceWithQuantity;
    });

    setProductsToRender(selectedProducts);

    // Calculate discount
    const discount = subTotal * discountRate;

    // Apply discount
    const discountedTotal = subTotal - discount;

    // Calculate tax
    const tax = discountedTotal * taxRate;

    // Calculate logistics fee
    const logisticsFee = discountedTotal * logisticsRate;

    // Calculate shipping cost
    const shippingCost = selectedProducts.length * shippingCostPerProduct;

    // Calculate final checkout price
    const finalCheckoutPrice =
      discountedTotal + tax + logisticsFee + shippingCost;

    // Set the summary object
    setSummary({
      subtotal: subTotal,
      discount: discount,
      tax: tax,
      logisticsFee: logisticsFee,
      shippingCost: shippingCost,
      total: finalCheckoutPrice,
    });
  }, [products_store, discountRate, logisticsRate, shippingCostPerProduct, taxRate]);

  return (
    <>
      <div className="mx-auto mt-6 w-full lg:max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xl font-semibold text-gray-900">Order summary</p>

          <div className="space-y-2">
            {productsToRender.length > 0 ? (
              productsToRender.map((item) => (
                <dl key={item.id} className="flex items-center justify-between gap-4">
                  <dt className="truncate text-base font-medium text-gray-600">
                    {item.productTitle}
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${item.price * item.quantity}
                  </dd>
                </dl>
              ))
            ) : (
              <p className="text-rose-400">* No products selected</p>
            )}

            {productsToRender.length > 0 ? (
              <>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base text-gray-500">Shipping Cost</dt>
                  <dd className="text-base text-gray-500">
                    ${summary.shippingCost.toFixed(2)}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 pt-2">
                  <dt className="text-base text-gray-500">Discount</dt>
                  <dd className="text-base text-gray-500">
                    ${summary.discount.toFixed(2)}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 pt-2">
                  <dt className="text-base text-gray-500">Logistics Fee</dt>
                  <dd className="text-base text-gray-500">
                    ${summary.logisticsFee.toFixed(2)}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 pt-2">
                  <dt className="text-base text-gray-500">Tax</dt>
                  <dd className="text-base text-gray-500">
                    ${summary.tax.toFixed(2)}
                  </dd>
                </dl>
              </>
            ) : null}

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">
                ${summary.total.toFixed(2)}
              </dd>
            </dl>
          </div>

          <Button className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4">
            Proceed to Checkout
          </Button>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {" "}
              or{" "}
            </span>
            <Link href="/shop">
              <div className="text-primary-700 dark:text-primary-500 inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline">
                <span>Continue Shopping</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="voucher"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                {" "}
                Do you have a voucher or gift card?{" "}
              </label>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                placeholder="coupon code"
                required
              />
            </div>
            <Button
              type="submit"
              variant={"outline"}
              className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4"
            >
              Apply Code
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
