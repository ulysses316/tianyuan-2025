import React from "react";
import type { Metadata } from "next";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import {
  StrapiResponseServicios,
  StrapiResponseComments,
  StrapiResponseTerms,
  StrapiResponseServicePage,
} from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import ServiceCard from "@/components/services/ServiceCard";
import ClientsCarousel from "@/components/clients/ClientsCarousel";
import TermServices from "@/components/services/Terms";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent: AxiosResponse<StrapiResponseServicePage> = await strapi.get<StrapiResponseServicePage>(
    "/api/servicios-pagina?populate=imagen",
  );
  return {
    title: "Servicios",
    description:
      "Acupuntura, fisioterapia, auriculoterapia, moxibustión, masajes y doula en Ecatepec de Morelos. Terapias personalizadas basadas en medicina tradicional china.",
    openGraph: {
      title: "Servicios",
      description:
        "Acupuntura, fisioterapia, auriculoterapia, moxibustión, masajes y doula en Ecatepec de Morelos. Terapias personalizadas basadas en medicina tradicional china.",
      images: [
        {
          url: `${pageContent.data.data.imagen.url}`,
          width: 1200,
          height: 630,
          alt: "Centro de terapias y acupuntura Tian Yuan",
        },
      ],
    },
  };
}

export default async function page() {
  let content: AxiosResponse<StrapiResponseServicios> | null = null;
  let terms: AxiosResponse<StrapiResponseTerms> | null = null;
  let comments: AxiosResponse<StrapiResponseComments> | null = null;
  let pageContent: AxiosResponse<StrapiResponseServicePage> | null = null;

  const [contentResponse, termsResponse, commentsResponse, servicePageResponse] = await Promise.allSettled([
    strapi.get<StrapiResponseServicios>("/api/servicios?populate=imagen&sort=orden_en_la_pagina:asc"),
    strapi.get<StrapiResponseTerms>("/api/terminos-y-condiciones?sort=numero:asc"),
    strapi.get<StrapiResponseComments>("/api/comentarios"),
    strapi.get<StrapiResponseServicePage>("/api/servicios-pagina?populate=imagen"),
  ]);

  if (contentResponse.status === "fulfilled") content = contentResponse.value;
  if (termsResponse.status === "fulfilled") terms = termsResponse.value;
  if (commentsResponse.status === "fulfilled") comments = commentsResponse.value;
  if (servicePageResponse.status === "fulfilled") pageContent = servicePageResponse.value;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios en Centro de Terapias y Acupuntura Tian Yuan",
    itemListElement: content?.data.data.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `https://www.terapias-tianyuan.com/servicios/${service.slug}`,
        name: service.titulo,
        url: `https://www.terapias-tianyuan.com/servicios/${service.slug}`,
        description: service.descripcion ?? undefined,
        image: service.imagen?.url ?? undefined,
        provider: {
          "@type": "HealthAndBeautyBusiness",
          "@id": "https://www.terapias-tianyuan.com",
          name: "Centro de Terapias y Acupuntura Tian Yuan",
        },
      },
    })),
  };

  if (!content && !terms && !comments && !servicePageResponse) return notFound();

  return (
    <>
      <BannerPages
        title="Nuestros servicios"
        text={pageContent?.data.data.parrafo_principal || ""}
        src={
          typeof pageContent?.data.data.imagen.url !== undefined
            ? `${pageContent?.data.data.imagen.url}`
            : "/images/about-us.jpg"
        }
      />
      <section className="mb-12 px-4 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 justify-center gap-x-6 gap-y-4 justify-self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(3,370px)]">
          {content !== null &&
            content?.data.data.map((service) => (
              <ServiceCard
                key={service.documentId}
                title={service.titulo}
                description={service.descripcion}
                href={service.slug}
                src={typeof service.imagen?.url !== "undefined" ? `${service.imagen?.url}` : "/images/about-us.jpg"}
              />
            ))}
        </div>
      </section>
      <section className="mb-12 min-h-96 px-4 text-lg sm:min-h-72 md:px-20 lg:px-28">
        {comments !== null && <ClientsCarousel comments={comments.data.data} />}
      </section>

      {terms !== null && <TermServices title="Terminos y condiciones de los servicios" terms={terms.data.data} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
