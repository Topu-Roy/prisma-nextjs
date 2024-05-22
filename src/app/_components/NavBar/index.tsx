import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import MobileMenu from "./mobileMenu";
import CartIconWithUser from "./cartIcon";
import { LoginLink, LogoutLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Search } from "lucide-react";

export default async function NavBar() {
  const { isAuthenticated: checkAuth, getUser } = getKindeServerSession();
  const isAuthenticated = await checkAuth();
  const user = await getUser();
  return (
    <header className="fixed top-0 z-50 flex h-[5.5rem] w-[100vw] items-center justify-center bg-white px-2 shadow-sm">
      <div className="mx-auto flex w-[98vw] max-w-[85rem] flex-row justify-between">
        <div className="relative flex items-center justify-between gap-2">
          <MobileMenu />

          <Link href="/home">
            <Image
              src="/logo-text.png"
              height={100}
              width={146}
              alt="furnit"
              className="h-[30px] w-auto"
            />
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-4 font-semibold md:flex">
          <Link href="/home">
            <Button variant={"ghost"}>Home</Button>
          </Link>

          <Link href="/shop">
            <Button variant={"ghost"}>Shop</Button>
          </Link>

          <Link href="/blog">
            <Button variant={"ghost"}>Blog</Button>
          </Link>

          <Link href="/aboutUs">
            <Button variant={"ghost"}>About Us</Button>
          </Link>

          <Link href="/team">
            <Button variant={"ghost"}>Team</Button>
          </Link>

          <Link href="/createProduct">
            <Button variant={"ghost"}>Create</Button>
          </Link>
        </div>

        <div className="flex w-auto flex-row items-center justify-between gap-3">
          <Button variant={"ghost"} className="p-1">
            <Search />
          </Button>

          <CartIconWithUser />

          <div>
            {!isAuthenticated ? <LoginLink>Sign In</LoginLink> : (
              <div className="profile-blob">
                {user?.picture ? (
                  <Image
                    height={100}
                    width={100}
                    src={user?.picture}
                    alt={`${user?.given_name}`}
                  />
                ) : (
                  <div>
                    {user?.given_name?.[0]}
                    {user?.family_name?.[0]}
                  </div>
                )}
                <div>
                  <p className="text-heading-2">
                    {user?.given_name} {user?.family_name}
                  </p>

                  <LogoutLink className="text-subtle">Log out</LogoutLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
