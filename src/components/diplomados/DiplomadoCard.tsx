import React from "react";
import Image from "next/image";
import LinkWArrow from "../shared/LinkWArrow";
import type { DiplomadoCardProps } from "@/utils/types";

export default function DiplomadoCard({ title, description, href }: DiplomadoCardProps) {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="relative h-72 w-full">
        <Image className="rounded-lg object-cover" src={"/images/about-us.jpg"} fill alt="" />
      </div>
      <h2 className="font-cormorant text-3xl">{title}</h2>
      <p className="text-lg">{description}</p>
      <div className="mt-2">
        <LinkWArrow href={`/diplomados/${href}`}>Ver mas del diplomado</LinkWArrow>
      </div>
    </div>
  );
}
