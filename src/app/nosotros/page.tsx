import React from "react";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import { StrapiResponseNosotros } from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";

export default async function page() {
  const content: AxiosResponse<StrapiResponseNosotros> = await strapi("/api/nosotro");
  if (content.status !== 200) return notFound();

  return (
    <>
      <BannerPages />
      <section className="mb-12 flex items-center justify-center">
        <div
          className="prose prose-lg px-4 prose-headings:font-cormorant md:px-0"
          dangerouslySetInnerHTML={{ __html: content.data.data.content }}
        />
      </section>
    </>
  );
}
