import React from "react";
import Image from "next/image";
import LinkWArrow from "../shared/LinkWArrow";

export default function ServiceCard() {
  return (
    <div className="flex flex-col items-start justify-center gap-4">
      <div className="relative h-72 w-full">
        <Image className="rounded-lg object-cover" src={"/images/about-us.jpg"} fill alt="" />
      </div>
      <h2 className="font-cormorant text-3xl">Masaje</h2>
      <p className="text-lg">
        Massage therapy has been shown to reduce stress, improve sleep, boost immune function, and alleviate
        pain.
      </p>
      <div className="mt-2">
        <LinkWArrow href="#">Ver mas del servicio</LinkWArrow>
      </div>
    </div>
  );
}
