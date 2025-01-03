import React from "react";
import Image from "next/image";

type BannerPages = {
  title: string;
  text: string;
  src: string;
};

export default function BannerPages({ title, text, src }: BannerPages) {
  return (
    <div className="relative -top-[106px] -z-30 h-[550px]">
      <Image className="absolute -z-20 blur-sm" src={src} alt="" fill priority loading="eager" />
      <div className="absolute -z-10 h-full w-full bg-black/40" />
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 px-1 text-center text-white sm:px-0">
        <h1 className="font-cormorant text-5xl sm:text-6xl">{title}</h1>
        <p className="w-full text-base sm:text-lg md:w-1/2">{text}</p>
      </div>
    </div>
  );
}
