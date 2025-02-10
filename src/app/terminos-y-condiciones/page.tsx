import React from "react";
import TermServices from "@/components/services/Terms";
import { StrapiResponseTerms } from "@/utils/types";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function page() {
  let termServicios: AxiosResponse<StrapiResponseTerms> | null = null;
  let termDiplomados: AxiosResponse<StrapiResponseTerms> | null = null;
  let termSesiones: AxiosResponse<StrapiResponseTerms> | null = null;

  const [termsServiciosData, termsDiplomadosData, termsSesionesData] = await Promise.allSettled([
    strapi.get<StrapiResponseTerms>("/api/terminos-y-condiciones?sort=numero:asc"),
    strapi.get<StrapiResponseTerms>("/api/terminos-diplomados?sort=numero:asc"),
    strapi.get<StrapiResponseTerms>("/api/terminos-sesiones?sort=numero:asc"),
  ]);

  if (termsServiciosData.status === "fulfilled") termServicios = termsServiciosData.value;
  if (termsDiplomadosData.status === "fulfilled") termDiplomados = termsDiplomadosData.value;
  if (termsSesionesData.status === "fulfilled") termSesiones = termsSesionesData.value;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Términos y Condiciones",
    url: "https://tianyuan.com/terminos-y-condiciones",
    about: "Términos y condiciones del uso del sitio web y servicios de Centro de Terapias y Acupuntura Tian Yuan.",
  };

  if (!termServicios && !termDiplomados && !termSesiones) return notFound();

  return (
    <>
      {termServicios !== null && (
        <TermServices
          title="Terminos y condiciones de los servicios"
          titleId="tyc-servicios"
          terms={termServicios?.data.data}
        />
      )}
      {termSesiones !== null && (
        <TermServices
          title="Terminos y Condiciones de las 5 sesiones"
          titleId="tyc-sesiones"
          terms={termSesiones.data.data}
        />
      )}
      {termDiplomados !== null && (
        <TermServices
          title="Terminos y Condiciones de los diplomados"
          titleId="tyc-diplomados"
          terms={termDiplomados.data.data}
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
