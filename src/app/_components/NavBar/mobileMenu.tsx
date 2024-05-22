"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileMenu() {
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleClick() {
    setSheetOpen(!sheetOpen);
  }

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={() => handleClick()}
            className="flex h-[2rem] flex-col items-center justify-center gap-1.5 rounded p-1 md:hidden"
          >
            <div className="h-[2px] w-[1.6rem] rounded-full bg-white" />
            <div className="h-[2px] w-[1.6rem] rounded-full bg-white" />
            <div className="h-[2px] w-[1.6rem] rounded-full bg-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <Link
            href="/home"
            className="flex w-[80%] items-center justify-center border-b border-stone-300/20"
          >
            <Button onClick={() => handleClick()} variant={"ghost"}>
              Home
            </Button>
          </Link>

          <Link
            href="/shop"
            className="flex w-[80%] items-center justify-center border-b border-stone-300/20"
          >
            <Button onClick={() => handleClick()} variant={"ghost"}>
              Shop
            </Button>
          </Link>

          <Link
            href="/blog"
            className="flex w-[80%] items-center justify-center border-b border-stone-300/20"
          >
            <Button onClick={() => handleClick()} variant={"ghost"}>
              Blog
            </Button>
          </Link>

          <Link
            href="/aboutUs"
            className="flex w-[80%] items-center justify-center border-b border-stone-300/20"
          >
            <Button onClick={() => handleClick()} variant={"ghost"}>
              About Us
            </Button>
          </Link>

          <Link
            href="/team"
            className="flex w-[80%] items-center justify-center border-b border-stone-300/20"
          >
            <Button onClick={() => handleClick()} variant={"ghost"}>
              Team
            </Button>
          </Link>
        </SheetContent>
      </Sheet>
    </>
  );
}
