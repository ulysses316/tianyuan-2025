import React from "react";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import { StrapiResponseServicio } from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import type { ParamSlug } from "@/utils/types";

export default async function page({ params }: ParamSlug) {
  const { slug } = await params;

  const content: AxiosResponse<StrapiResponseServicio> = await strapi(
    `/api/servicios?filters[slug][$eq]=${slug}`,
  );
  if (content.status !== 200) return notFound();

  return (
    <>
      <BannerPages
        title={content.data.data[0].titulo}
        text={content.data.data[0].descripcion}
        src="/images/about-us.jpg"
      />
      <section className="mb-12 flex items-center justify-center">
        <div
          className="prose prose-lg px-4 prose-headings:font-cormorant md:px-0"
          dangerouslySetInnerHTML={{ __html: content.data.data[0].contenido }}
        />
      </section>
    </>
  );
}
