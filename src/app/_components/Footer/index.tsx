import React from "react";
import { cn } from "@/lib/utils";
import Newsletter from "./newsletter";
import FooterLinks from "./footerLinks";
import Copyright from "./copyright";

interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  return (
    <footer className={cn("pt-6 md:pt-8 lg:pt-14 xl:pt-16", className)}>
      <div className="px-2">
        <Newsletter />
      </div>
      <FooterLinks />
      <Copyright />
    </footer>
  );
}
