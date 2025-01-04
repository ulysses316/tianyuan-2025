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
import config from "@/utils/config";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent: AxiosResponse<StrapiResponseDiplomadosPage> = await strapi.get<StrapiResponseDiplomadosPage>(
    "/api/dilpomados-pagina?populate=imagen",
  );
  return {
    title: "Diplomados",
    description: pageContent.data.data.parrafo_principal,
    openGraph: {
      title: "Diplomados",
      description: pageContent.data.data.parrafo_principal,
      images: [
        {
          url: `${config.NEXT_PUBLIC_API_URL}${pageContent.data.data.imagen.url}`,
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
    strapi.get<StrapiResponseDiplomado>("/api/dilpomados?populate=imagen"),
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
    itemListElement: diplomados?.data.data.map((diplomado) => {
      return {
        "@type": "Course",
        name: `Diplomado en ${diplomado.titulo}`,
        description: diplomado.descripcion,
        availableLanguage: ["es-MX"],
        provider: {
          "@type": "Organization",
          name: "Centro de Terapias y Acupuntura Tian Yuan",
          url: `https://www.terapias-tianyuan.com/${diplomado.slug}`,
          image: diplomado.imagen.url,
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
    }),
  };

  if (!diplomados && !terms && !comments && !pageContent) return notFound();

  return (
    <>
      <BannerPages
        title="Nuestros diplomados"
        text={pageContent?.data.data.parrafo_principal || ""}
        src={
          typeof pageContent?.data.data.imagen.url !== undefined
            ? `${config.NEXT_PUBLIC_API_URL}${pageContent?.data.data.imagen.url}`
            : "/images/about-us.jpg"
        }
      />
      <section className="mb-12 px-4 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 gap-4 justify-self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(2,555px)]">
          {diplomados !== null &&
            diplomados?.data.data.map((diplomado) => (
              <DiplomadoCard
                key={diplomado.id}
                title={diplomado.titulo}
                description={diplomado.descripcion}
                href={diplomado.slug}
                src={
                  typeof diplomado.imagen?.formats.small.url !== "undefined"
                    ? `${config.NEXT_PUBLIC_API_URL}${diplomado.imagen?.formats.small.url}`
                    : "/images/about-us.jpg"
                }
              />
            ))}
        </div>
      </section>
      <section className="mb-12 min-h-72 px-4 text-lg md:px-20 lg:px-28">
        {comments !== null && <ClientsCarousel comments={comments.data.data} />}
      </section>

      {terms !== null && <TermServices terms={terms.data.data} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
