import "@/styles/globals.css";

import NavBar from "./_components/NavBar";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { inter } from "@/styles/font";


export const metadata = {
  title: "Furnit",
  description: "Decorate your house with beautiful furniture's",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <NavBar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
