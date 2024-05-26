"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useCallback, useEffect, useState } from "react";
import { Text } from "@/app/_components/text";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Rating from "./rating";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { createRevive } from "@/actions/reviewAction";

type Props = {
  productId: string;
  productTitle: string;
};

export default function CreateReview({
  productTitle,
  productId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const handleSetRate = useCallback((newRate: number) => setRate && setRate(newRate), []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rateErr, setRateErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { getUser } = useKindeBrowserClient();
  const user = getUser()

  async function handleCreateReview() {
    if (!user) {
      return toast({
        variant: "destructive",
        title: "Please login first",
        description: "Oh no, you are not logged in...!",
      });
    }

    if (rate === 0) {
      setRateErr(true);
      return;
    }
    if (name === "") {
      setNameErr(true);
      return;
    }
    if (description === "") {
      setDescriptionErr(true);
      return;
    }

    setOpen(false);

    const response = await createRevive({
      authId: user.id,
      productId: productId,
      rate: rate,
      name: name,
      description: description,
    }).finally(() => {
      router.refresh();
    });

    if (!response) return toast({
      variant: "destructive",
      title: "Something went wrong",
      description: "Please try again later",
    });
  }

  useEffect(() => {
    if (rate !== 0) {
      setRateErr(false);
    }
    if (description !== "") {
      setDescriptionErr(false);
    }
    if (name !== "") {
      setNameErr(false);
    }
  }, [rate, description, name]);

  return (
    <>
      {user !== null ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="mb-2 me-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4">
              Write a review
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Add a review for:
                  </h3>
                  <a
                    href="#"
                    className="line-clamp-2 font-medium hover:underline"
                  >
                    {productTitle}
                  </a>
                </div>
              </div>

              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex items-center justify-start gap-3">
                    <span>Your Rating: </span>
                    <Rating
                      rate={rate}
                      readonly={false}
                      className="-mx-4 scale-75"
                      handleSetRate={handleSetRate}
                    />
                    <span>({rate})</span>
                  </div>
                  {rateErr ? (
                    <Text size="s" className="text-rose-500">
                      *Please give a rating
                    </Text>
                  ) : null}
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400"
                      required
                    ></input>
                    {nameErr ? (
                      <Text size="s" className="text-rose-500">
                        *Please type your name
                      </Text>
                    ) : null}
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Review description
                    </label>
                    <textarea
                      id="description"
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400"
                      required
                    ></textarea>
                    {descriptionErr ? (
                      <Text size="s" className="text-rose-500">
                        *Please type a description
                      </Text>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <Button className="min-w-20" onClick={() => handleCreateReview()}>
                    Done
                  </Button>
                  <Button
                    className="min-w-20"
                    onClick={() => setOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Link href={"/authcallback"}>
          <Button className="my-4 me-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4">
            Write a review
          </Button>
        </Link>
      )}
    </>
  );
}
