import React from "react";
import { Metadata } from "next";
import SlufigyNameVideo from "@/components/couses/SlufigyNameVideo";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function page() {
  return (
    <section className="flex min-h-[50dvh] flex-col items-center justify-center gap-4">
      <h1 className="font-cormorant text-3xl">Proporciona el nombre del video</h1>
      <SlufigyNameVideo />
    </section>
  );
}
