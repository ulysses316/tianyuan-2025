import React from "react";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import { StrapiResponseNosotros } from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import config from "@/utils/config";

export async function generateMetadata() {
  const content: AxiosResponse<StrapiResponseNosotros> =
    await strapi<StrapiResponseNosotros>("/api/nosotro?populate=imagen");

  return {
    title: "Nosotros",
    description: content.data.data.descripcion,
    openGraph: {
      title: "Nosotros",
      description: content.data.data.descripcion,
      images: [
        {
          url:
            typeof content.data.data.imagen.url !== undefined
              ? `${config.NEXT_PUBLIC_API_URL}${content.data.data.imagen.url}`
              : "/images/about-us.jpg",
          width: 1200,
          height: 630,
          alt: "Centro de terapias y acupuntura Tian Yuan",
        },
      ],
    },
  };
}

export default async function page() {
  const content: AxiosResponse<StrapiResponseNosotros> =
    await strapi<StrapiResponseNosotros>("/api/nosotro?populate=imagen");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Centro de Terapias y Acupuntura Tian Yuan",
      url: "https://www.terapias-tianyuan.com",
      image: `${config.NEXT_PUBLIC_API_URL}${content.data.data.imagen.url}`,
      description:
        "Somos un centro especializado en terapias alternativas y acupuntura, dedicado al bienestar integral.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5 de Mayo 25",
        addressLocality: "San Cristóbal Centro",
        postalCode: "55000",
        addressRegion: "México",
        addressCountry: "MX",
        telephone: "5531202502",
      },
    },
  };

  if (content.status !== 200) return notFound();

  return (
    <>
      <BannerPages
        title="Sobre nosotros"
        text={content.data.data.descripcion}
        src={
          typeof content.data.data.imagen.url !== undefined
            ? `${config.NEXT_PUBLIC_API_URL}${content.data.data.imagen.url}`
            : "/images/about-us.jpg"
        }
      />
      <section className="mb-12 flex items-center justify-center">
        <div
          className="prose prose-lg px-4 prose-headings:font-cormorant prose-figure:flex prose-figure:w-full prose-figure:justify-center prose-figure:rounded-lg prose-img:w-full prose-img:rounded-lg prose-img:sm:w-1/2 md:px-0"
          dangerouslySetInnerHTML={{ __html: content.data.data.contenido }}
        />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
