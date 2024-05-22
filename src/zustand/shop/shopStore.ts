import { type Category, type Color, type Product, type Tag } from "@prisma/client";
import { create } from "zustand";

type ShopState = {
  productsBackup: Product[];
  selectedMinPrice: number;
  selectedMaxPrice: number;
  selectedSliderPrice: number;
  selectedSorting: "default" | "price";
  selectedColor: Color | undefined;
  selectedCategory: Category | "All";
  selectedTag: Tag | "All";
  searchInputText: string;
};

type ShopAction = {
  setProductsBackup: (products: Product[]) => void;
  setSelectedCategory: (category: Category | "All") => void;
  setSelectedColor: (color: Color | undefined) => void;
  setSelectedSliderPrice: (price: number) => void;
  setSelectedMinPrice: (price: number) => void;
  setSelectedMaxPrice: (price: number) => void;
  setSelectedSorting: (sort: "default" | "price") => void;
  setSearchInputText: (text: string) => void;
  setSelectedTag: (tag: Tag | "All") => void;
};

export type ShopStoreType = ShopState & ShopAction;

const defaultInitState: ShopState = {
  productsBackup: [],
  selectedMinPrice: 0,
  selectedMaxPrice: 2000,
  selectedSliderPrice: 2000,
  selectedSorting: "default",
  selectedColor: undefined,
  selectedCategory: "All",
  selectedTag: "All",
  searchInputText: "",
};

export const useShopStore = create<ShopStoreType>((set) => ({
  ...defaultInitState,
  setProductsBackup: (products) => set(() => ({ productsBackup: products })),
  setSelectedCategory: (category) => set(() => ({ selectedCategory: category })),
  setSelectedColor: (color) => set(() => ({ selectedColor: color })),
  setSelectedSliderPrice: (price) => set(() => ({ selectedSliderPrice: price })),
  setSelectedMinPrice: (price) => set(() => ({ selectedMinPrice: price })),
  setSelectedMaxPrice: (price) => set(() => ({ selectedMaxPrice: price })),
  setSelectedSorting: (sort) => set(() => ({ selectedSorting: sort })),
  setSearchInputText: (text) => set(() => ({ searchInputText: text })),
  setSelectedTag: (tag) => set(() => ({ selectedTag: tag })),
}))