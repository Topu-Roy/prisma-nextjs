"use client";
import React, { useEffect, useState } from "react";
import { type Product } from "@prisma/client";
import useDeviceWidth from "@/hooks/windowDimensions";
import WideScreenProductCarousel from "./_carousels/wideScreenProductCarousel";
import DesktopProductCarousel from "./_carousels/desktopProductCarousel";
import TabletProductCarousel from "./_carousels/tabletProductCarousel";
import MobileProductCarousel from "./_carousels/mobileProductCarousel";

type Props = {
  products: Product[];
};

export default function RenderProductCarousel({ products }: Props) {
  const [deviceWidth, setDeviceWidth] = useState<number | null>(null);
  const width = useDeviceWidth();

  useEffect(() => {
    setDeviceWidth(width);
  }, [width]);

  if (deviceWidth === null) {
    return null;
  }

  if (deviceWidth >= 1280) {
    return <WideScreenProductCarousel products={products} />;
  }

  if (deviceWidth >= 1024) {
    return <DesktopProductCarousel products={products} />;
  }

  if (deviceWidth >= 768) {
    return <TabletProductCarousel products={products} />;
  }

  return <MobileProductCarousel products={products} />;
}
