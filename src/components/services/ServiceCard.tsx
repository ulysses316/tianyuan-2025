import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { ServiceCardProps } from "@/utils/types";
import Link from "next/link";

export default function ServiceCard({ title, description, href, src }: ServiceCardProps) {
  return (
    <Link href={`/servicios/${href}`} className="flex flex-col items-start gap-4">
      <div className="relative h-72 w-full">
        <Image className="rounded-lg object-cover" src={src} fill alt="" />
      </div>
      <h2 className="font-cormorant text-3xl">{title}</h2>
      <p className="text-lg">{description}</p>
      <div className="mt-2">
        <span className="group flex items-center justify-center gap-2 text-lg transition-all duration-300 hover:underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-300 text-sky-300 transition-all duration-300 group-hover:bg-sky-300 group-hover:text-white">
            <ChevronRight size={24} />
          </div>
          Ver más del servicio
        </span>
      </div>
    </Link>
  );
}
