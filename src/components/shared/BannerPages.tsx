import React from "react";
import Image from "next/image";

export default function BannerPages() {
  return (
    <div className="relative -top-[106px] -z-30 h-[550px]">
      <Image className="absolute -z-20 blur-sm" src={"/images/about-us.jpg"} alt="" fill />
      <div className="absolute -z-10 h-full w-full bg-black/40" />
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 px-1 text-center text-white sm:px-0">
        <h1 className="font-cormorant text-5xl sm:text-6xl">Sobre nosotros</h1>
        <p className="w-full text-base sm:text-lg md:w-1/2">
          Nuestra medicina alternativa ofrece un entorno de apoyo y estímulo donde usted puede explorar sus
          objetivos de salud y bienestar y encontrar el mejor camino para usted.
        </p>
      </div>
    </div>
  );
}
