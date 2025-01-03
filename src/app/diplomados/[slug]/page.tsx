import React from "react";
import type { Metadata } from "next";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import { StrapiResponseDiplomado } from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import type { ParamSlug } from "@/utils/types";
import config from "@/utils/config";

export async function generateMetadata({ params }: ParamSlug): Promise<Metadata> {
  const { slug } = await params;
  const content: AxiosResponse<StrapiResponseDiplomado> = await strapi(
    `/api/dilpomados?filters[slug][$eq]=${slug}&populate=imagen`,
  );
  return {
    title: `Diplomado de ${content.data.data[0].titulo}`,
    description: content.data.data[0].descripcion,
    openGraph: {
      title: `Diplomado de ${content.data.data[0].titulo}`,
      description: content.data.data[0].descripcion,
      images: [
        {
          url:
            typeof content.data.data[0].imagen.url !== "undefined"
              ? `${config.NEXT_PUBLIC_API_URL}${content.data.data[0].imagen.url}`
              : "/images/about-us.jpg",
          width: 1200,
          height: 630,
          alt: content.data.data[0].titulo,
        },
      ],
    },
  };
}

export default async function page({ params }: ParamSlug) {
  const { slug } = await params;

  const content: AxiosResponse<StrapiResponseDiplomado> = await strapi(
    `/api/dilpomados?filters[slug][$eq]=${slug}&populate=imagen`,
  );
  if (content.status !== 200) return notFound();

  return (
    <>
      <BannerPages
        title={content.data.data[0].titulo}
        text={content.data.data[0].descripcion}
        src={
          typeof content.data.data[0].imagen.url !== "undefined"
            ? `${config.NEXT_PUBLIC_API_URL}${content.data.data[0].imagen.url}`
            : "/images/about-us.jpg"
        }
      />
      <section className="mb-12 flex items-center justify-center">
        <div
          className="prose prose-lg px-4 prose-headings:font-cormorant prose-figure:flex prose-figure:w-full prose-figure:justify-center prose-figure:rounded-lg prose-img:w-full prose-img:rounded-lg prose-img:sm:w-1/2 md:px-0"
          dangerouslySetInnerHTML={{ __html: content.data.data[0].contenido }}
        />
      </section>
    </>
  );
}
