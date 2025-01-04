import React from "react";
import { Metadata } from "next";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import { StrapiResponseServicio } from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import type { ParamSlug } from "@/utils/types";
import config from "@/utils/config";

export async function generateMetadata({ params }: ParamSlug): Promise<Metadata> {
  const { slug } = await params;
  const content: AxiosResponse<StrapiResponseServicio> = await strapi(
    `/api/servicios?filters[slug][$eq]=${slug}&populate=imagen`,
  );
  return {
    title: `Servicio de ${content.data.data[0].titulo}`,
    description: content.data.data[0].descripcion,
    openGraph: {
      title: `Servicio de ${content.data.data[0].titulo}`,
      description: content.data.data[0].descripcion,
      images: [
        {
          url:
            typeof content.data.data[0].imagen?.url !== "undefined"
              ? `${config.NEXT_PUBLIC_API_URL}${content.data.data[0].imagen?.url}`
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

  const content: AxiosResponse<StrapiResponseServicio> = await strapi(
    `/api/servicios?filters[slug][$eq]=${slug}&populate=imagen`,
  );

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: content.data.data[0].titulo,
    provider: {
      "@type": "LocalBusiness",
      name: "Centro de Terapias y Acupuntura Tian Yuan",
      image: `${config.NEXT_PUBLIC_API_URL}${content.data.data[0].imagen.url}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "5 de Mayo 25",
        addressLocality: "San Cristóbal Centro",
        postalCode: "55000",
        addressRegion: "México",
        addressCountry: "MX",
        telephone: "5531202502",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 19.601640178869076,
        longitude: -99.04384808926673,
      },
      url: `https://www.terapias-tianyuan.com/servicios/${slug}`,
      priceRange: "$",
      areaServed: {
        "@type": "Place",
        name: "Ecatepec de Morelos",
      },
    },
  };

  if (content.status !== 200) return notFound();

  return (
    <>
      <BannerPages
        title={content.data.data[0].titulo}
        text={content.data.data[0].descripcion}
        src={
          typeof content.data.data[0].imagen?.url !== "undefined"
            ? `${config.NEXT_PUBLIC_API_URL}${content.data.data[0].imagen?.url}`
            : "/images/about-us.jpg"
        }
      />
      <section className="mb-12 flex items-center justify-center">
        <div
          className="prose prose-lg px-4 prose-headings:font-cormorant prose-figure:flex prose-figure:w-full prose-figure:justify-center prose-figure:rounded-lg prose-img:w-full prose-img:rounded-lg prose-img:sm:w-1/2 md:px-0"
          dangerouslySetInnerHTML={{ __html: content.data.data[0].contenido }}
        />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
