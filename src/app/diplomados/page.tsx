import React from "react";
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

export default async function page() {
  let diplomados: AxiosResponse<StrapiResponseDiplomado> | null = null;
  let terms: AxiosResponse<StrapiResponseTerms> | null = null;
  let comments: AxiosResponse<StrapiResponseComments> | null = null;
  let pageContent: AxiosResponse<StrapiResponseDiplomadosPage> | null = null;

  const [diplomadosResponse, termsResponse, commentsResponse, diplomadosPageResponse] = await Promise.allSettled([
    strapi.get<StrapiResponseDiplomado>("/api/dilpomados"),
    strapi.get<StrapiResponseTerms>("/api/terminos-y-condiciones?sort=numero:asc"),
    strapi.get<StrapiResponseComments>("/api/comentarios"),
    strapi.get<StrapiResponseDiplomadosPage>("/api/dilpomados-pagina"),
  ]);

  if (diplomadosResponse.status === "fulfilled") diplomados = diplomadosResponse.value;
  if (termsResponse.status === "fulfilled") terms = termsResponse.value;
  if (commentsResponse.status === "fulfilled") comments = commentsResponse.value;
  if (diplomadosPageResponse.status === "fulfilled") pageContent = diplomadosPageResponse.value;

  if (!diplomados && !terms && !comments && !pageContent) return notFound();

  return (
    <>
      <BannerPages
        title="Nuestros diplomados"
        text={pageContent?.data.data.parrafo_principal || ""}
        src="/images/about-us.jpg"
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
