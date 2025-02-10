import React from "react";
import type { Metadata } from "next";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import { StrapiResponseDiplomado } from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import type { ParamSlug } from "@/utils/types";
import config from "@/utils/config";
import "@/app/styles/ck-editor.css";

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

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Course",
    name: slug,
    description: content.data.data[0].descripcion,
    image: `${config.NEXT_PUBLIC_API_URL}${content.data.data[0].imagen.url}`,
    availableLanguage: ["es-MX"],
    location: "Centro de Terapias y Acupuntura Tian Yuan",
    provider: {
      "@type": "Organization",
      name: "Centro de Terapias y Acupuntura Tian Yuan",
      url: `https://www.terapias-tianyuan.com/${content.data.data[0].slug}`,
      image: content.data.data[0].imagen.url,
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
    offers: [
      {
        "@type": "Offer",
        category: "Paid",
        priceCurrency: "MXN",
      },
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Online", "Onsite"],
      courseSchedule: {
        "@type": "Schedule",
        duration: "PT3H",
        repeatCount: 52,
        repeatFrequency: "Weekly",
      },
    },
    instructor: {
      "@type": "Person",
      name: "LAHR (Licenciada en Acupuntura Humana Rehabilitatoria) Brisa Arely Oviedo Yañez",
      description: "Especialista en acupuntura y terapias complementarias.",
    },
  };

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
          className="ck-content prose prose-lg px-4 prose-headings:font-cormorant prose-a:break-all prose-figure:rounded-lg prose-img:rounded-lg md:px-0"
          dangerouslySetInnerHTML={{ __html: content.data.data[0].contenido }}
        />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
