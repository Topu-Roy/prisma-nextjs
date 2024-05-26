import React from "react";
import CartCheckout from "./_components/cartCheckout";
import SelectAllAndReset from "./_components/selectAllAndReset";
import { Heading } from "../_components/heading";
import { Text } from "../_components/text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RenderCart from "./_components/renderCart";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getAllCartItems } from "@/actions/cartAction";

export default async function CartPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/authcallback");

  const allCartProducts = await getAllCartItems({ authId: user.id })

  if (!allCartProducts) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6">
        <Heading className="mt-[4rem] pt-8 text-center">Loading...</Heading>
      </div>
    );
  }

  if (allCartProducts === null || allCartProducts.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 bg-stone-200">
        <Heading className="mt-[4rem] pt-8 text-center">
          Cart is empty...!
        </Heading>
        <Link href={"/shop"}>
          <Button>Add a new Product</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-200/30">
      <Heading className="mt-[4rem] pt-6 text-center">My Cart</Heading>

      <Text size="md" className="pb-8 pt-5 text-center text-rose-500 underline">
        * Select products to Checkout
      </Text>

      <SelectAllAndReset />

      <div className="mx-auto flex flex-col xl:flex-row max-w-7xl items-start justify-between gap-2 pb-10">
        <RenderCart products={allCartProducts} />

        <div className="flex px-2 md:px-0 w-[97%] lg:w-[55rem] mx-auto xl:max-w-sm flex-1 flex-col">
          <CartCheckout />
        </div>
      </div>
    </div>
  );
}
