import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToTop() {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, 50)
}

export let BASE_URL: string;
if (process.env.NODE_ENV === "production") {
  const developmentUrl = process.env.VERCEL_URL
  BASE_URL = `https://${developmentUrl}`
} else {
  BASE_URL = "http://localhost:3000"
}