"use client";
import React, { useEffect, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import SelectFieldItem from "../_components/formSelectItem";
import { category, color, createProductPostBodySchema, tag, type createProductPostBodyType } from "@/zod/createProduct";

export default function CreateProduct() {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const router = useRouter();

  // * React-Hook-Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValidating, isLoading },
  } = useForm<createProductPostBodyType>({
    resolver: zodResolver(createProductPostBodySchema),
  });

  // * Set the submit button disabled if any errors are present
  useEffect(() => {
    setIsDisabled(false);

    const hasError =
      errors.productTitle !== undefined ||
      errors.price !== undefined ||
      errors.description !== undefined ||
      errors.color !== undefined ||
      errors.category !== undefined ||
      errors.tag !== undefined;

    setIsDisabled(hasError);
  }, [
    errors.productTitle,
    errors.price,
    errors.description,
    errors.color,
    errors.category,
    errors.tag,
  ]);

  const onSubmit: SubmitHandler<createProductPostBodyType> = async (data) => {
    try {
      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("data: ", data);
      if (res.ok) {
        const resJson: unknown = await res.json();

        console.log("Response: ", resJson);

        // * Validating the response from the server
        const expectedResponseSchema = z.object({
          id: z.string().min(20).max(28),
        });

        const validatedRes = expectedResponseSchema.parse(resJson);

        // * Sending the recently created product id to upload route
        // * to update the product image with uploaded image url
        router.replace(`/createProduct/upload?id=${validatedRes.id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.stack);
      }
    }
  };

  return (
    <div className="mx-auto mt-[6rem] max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* //* Title * */}
        <div className="space-y-2">
          <Label htmlFor="CreateProduct_Title">Title</Label>
          <Input
            id="CreateProduct_Title"
            placeholder="Glass Top Coffee Table"
            type="text"
            {...register("productTitle")}
            className={cn(
              "w-full",
              errors.productTitle !== undefined ? "border-rose-600" : "",
            )}
          />
          <p
            className={cn("hidden rounded-md bg-rose-100 p-2 text-rose-600", {
              block: errors.productTitle,
            })}
          >
            {errors.productTitle ? errors.productTitle.message : null}
          </p>
        </div>

        {/* //* Description * */}
        <div className="space-y-2">
          <Label htmlFor="CreateProduct_Title">Title</Label>
          <Textarea
            {...register("description")}
            id="CreateProduct_Description"
            placeholder="Product description"
            className={cn(
              "h-[5rem] w-full",
              errors.description !== undefined ? "border-rose-600" : "",
            )}
          />
          <p
            className={cn("hidden rounded-md bg-rose-100 p-2 text-rose-600", {
              block: errors.description,
            })}
          >
            {errors.description ? errors.description.message : null}
          </p>
        </div>

        {/* //* Price */}
        <div className="space-y-2">
          <Label htmlFor="CreateProduct_Price">Price</Label>
          <Input
            placeholder="Price"
            id="CreateProduct_Price"
            {...register("price", {
              valueAsNumber: true,
              min: {
                value: 5,
                message: "Price must be at least $5",
              },
            })}
            className={cn(
              "w-full",
              errors.price !== undefined ? "border-rose-600" : "",
            )}
          />
          <p
            className={cn("hidden rounded-md bg-rose-100 p-2 text-rose-600", {
              block: errors.price,
            })}
          >
            {errors.price ? errors.price.message : null}
          </p>
        </div>

        <div className="flex w-full items-center justify-between gap-2">
          {/* //* Color */}
          <div className="flex-1 space-y-2">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <SelectFieldItem
                  placeholder="color"
                  errors={errors}
                  onChange={onChange}
                  options={color}
                />
              )}
              name={"color"}
            />
          </div>

          {/* //* Category */}
          <div className={"flex-1 space-y-2"}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <SelectFieldItem
                  placeholder="category"
                  errors={errors}
                  onChange={onChange}
                  options={category}
                />
              )}
              name={"category"}
            />
          </div>

          {/* //* Tag */}
          <div className="flex-1 space-y-2">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <SelectFieldItem
                  placeholder="tag"
                  errors={errors}
                  onChange={onChange}
                  options={tag}
                />
              )}
              name={"tag"}
            />
          </div>
        </div>

        {/* //* Submit */}
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            type="submit"
            disabled={isDisabled || isSubmitting || isLoading || isValidating}
            className="w-full"
          >
            {isSubmitting || isLoading || isValidating
              ? "Loading..."
              : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
