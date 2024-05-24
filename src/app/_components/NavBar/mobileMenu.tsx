"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Squeeze as Hamburger } from 'hamburger-react'

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
            className="p-0 md:hidden"
          >
            <Hamburger toggled={sheetOpen} toggle={setSheetOpen} />
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
