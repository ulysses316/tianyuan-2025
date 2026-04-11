import React from "react";
import type { Metadata } from "next";
import { strapi } from "@/utils/strapi";
import type { AxiosResponse } from "axios";
import type {
  StrapiResponseDiplomado,
  StrapiResponseTerms,
  StrapiResponseComments,
  StrapiResponseDiplomadosPage,
} from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import DiplomadoCard from "@/components/diplomados/DiplomadoCard";
import ClientsCarousel from "@/components/clients/ClientsCarousel";
import TermServices from "@/components/services/Terms";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent: AxiosResponse<StrapiResponseDiplomadosPage> = await strapi.get<StrapiResponseDiplomadosPage>(
    "/api/dilpomados-pagina?populate=imagen",
  );
  return {
    title: "Diplomados",
    description:
      "Diplomados en acupuntura y medicina tradicional china en Ecatepec. Formación profesional con la Dra. Brisa Arely Oviedo. Cupos limitados, inscripciones abiertas.",
    openGraph: {
      title: "Diplomados",
      description:
        "Diplomados en acupuntura y medicina tradicional china en Ecatepec. Formación profesional con la Dra. Brisa Arely Oviedo. Cupos limitados, inscripciones abiertas.",
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
  let diplomados: AxiosResponse<StrapiResponseDiplomado> | null = null;
  let terms: AxiosResponse<StrapiResponseTerms> | null = null;
  let comments: AxiosResponse<StrapiResponseComments> | null = null;
  let pageContent: AxiosResponse<StrapiResponseDiplomadosPage> | null = null;

  const [diplomadosResponse, termsResponse, commentsResponse, diplomadosPageResponse] = await Promise.allSettled([
    strapi.get<StrapiResponseDiplomado>("/api/dilpomados?populate=imagen&sort=orden_en_la_pagina:asc"),
    strapi.get<StrapiResponseTerms>("/api/terminos-y-condiciones?sort=numero:asc"),
    strapi.get<StrapiResponseComments>("/api/comentarios"),
    strapi.get<StrapiResponseDiplomadosPage>("/api/dilpomados-pagina?populate=imagen"),
  ]);

  if (diplomadosResponse.status === "fulfilled") diplomados = diplomadosResponse.value;
  if (termsResponse.status === "fulfilled") terms = termsResponse.value;
  if (commentsResponse.status === "fulfilled") comments = commentsResponse.value;
  if (diplomadosPageResponse.status === "fulfilled") pageContent = diplomadosPageResponse.value;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Diplomados en Centro de Terapias y Acupuntura Tian Yuan",
    itemListElement: diplomados?.data.data.map((diplomado, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        "@id": `https://www.terapias-tianyuan.com/diplomados/${diplomado.slug}`,
        name: `Diplomado en ${diplomado.titulo}`,
        description: diplomado.descripcion ?? undefined,
        url: `https://www.terapias-tianyuan.com/diplomados/${diplomado.slug}`,
        image: diplomado.imagen?.url ?? undefined,
        inLanguage: "es-MX",
        provider: {
          "@type": "HealthAndBeautyBusiness",
          "@id": "https://www.terapias-tianyuan.com",
          name: "Centro de Terapias y Acupuntura Tian Yuan",
        },
        offers: [
          {
            "@type": "Offer",
            category: "Paid",
            priceCurrency: "MXN",
            // price: diplomado.precio ?? undefined,  // descomenta si tienes el campo
            url: `https://www.terapias-tianyuan.com/diplomados/${diplomado.slug}`,
          },
        ],
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: ["OnlineEventAttendanceMode", "OfflineEventAttendanceMode"],
          inLanguage: "es-MX",
          courseSchedule: {
            "@type": "Schedule",
            duration: "PT3H",
            repeatFrequency: "Weekly",
          },
          instructor: {
            "@type": "Person",
            name: "Brisa Arely Oviedo Yañez",
            jobTitle: "Licenciada en Acupuntura Humana Rehabilitatoria",
            description: "Especialista en acupuntura y terapias complementarias.",
            url: "https://www.terapias-tianyuan.com/nosotros",
          },
        },
      },
    })),
  };

  if (!diplomados && !terms && !comments && !pageContent) return notFound();

  return (
    <>
      <BannerPages
        title="Nuestros diplomados"
        text={pageContent?.data.data.parrafo_principal || ""}
        src={
          typeof pageContent?.data.data.imagen.url !== undefined
            ? `${pageContent?.data.data.imagen.url}`
            : "/images/about-us.jpg"
        }
      />
      <section className="mb-12 px-4 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 justify-center gap-4 justify-self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(2,555px)]">
          {diplomados !== null &&
            diplomados?.data.data.map((diplomado) => (
              <DiplomadoCard
                key={diplomado.id}
                title={diplomado.titulo}
                description={diplomado.descripcion}
                href={diplomado.slug}
                src={typeof diplomado.imagen?.url !== "undefined" ? `${diplomado.imagen?.url}` : "/images/about-us.jpg"}
              />
            ))}
        </div>
      </section>
      <section className="mb-12 min-h-72 px-4 text-lg md:px-20 lg:px-28">
        {comments !== null && <ClientsCarousel comments={comments.data.data} />}
      </section>

      {terms !== null && <TermServices title="Terminos y Condiciones de los diplomados" terms={terms.data.data} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
