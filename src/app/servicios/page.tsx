import React from "react";
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

export default async function page() {
  let content: AxiosResponse<StrapiResponseServicios> | null = null;
  let terms: AxiosResponse<StrapiResponseTerms> | null = null;
  let comments: AxiosResponse<StrapiResponseComments> | null = null;
  let pageContent: AxiosResponse<StrapiResponseServicePage> | null = null;

  const [contentResponse, termsResponse, commentsResponse, servicePageResponse] = await Promise.allSettled([
    strapi.get<StrapiResponseServicios>("/api/servicios"),
    strapi.get<StrapiResponseTerms>("/api/terminos-y-condiciones?sort=numero:asc"),
    strapi.get<StrapiResponseComments>("/api/comentarios"),
    strapi.get<StrapiResponseServicePage>("/api/servicios-pagina"),
  ]);

  if (contentResponse.status === "fulfilled") content = contentResponse.value;
  if (termsResponse.status === "fulfilled") terms = termsResponse.value;
  if (commentsResponse.status === "fulfilled") comments = commentsResponse.value;
  if (servicePageResponse.status === "fulfilled") pageContent = servicePageResponse.value;

  if (!content && !terms && !comments && !servicePageResponse) return notFound();

  return (
    <>
      <BannerPages
        title="Nuestros servicios"
        text={pageContent?.data.data.parrafo_principal || ""}
        src="/images/about-us.jpg"
      />
      <section className="mb-12 px-4 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 justify-self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(3,370px)]">
          {content !== null &&
            content?.data.data.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.titulo}
                description={service.descripcion}
                href={service.slug}
              />
            ))}
        </div>
      </section>
      <section className="mb-12 min-h-72 px-4 text-lg md:px-20 lg:px-28">
        {comments !== null && <ClientsCarousel comments={comments.data.data} />}
      </section>

      {terms !== null && <TermServices terms={terms.data.data} />}
    </>
  );
}
