import React from "react";
// import { strapi } from "@/utils/strapi";
// import { AxiosResponse } from "axios";
// import { StrapiResponseNosotros } from "@/utils/types";
// import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
// import ServiceCard from "@/components/services/ServiceCard";
import ClientsCarousel from "@/components/clients/ClientsCarousel";
import TermServices from "@/components/services/Terms";

export default async function page() {
  // const content: AxiosResponse<StrapiResponseNosotros> = await strapi("/api/nosotro");
  // if (content.status !== 200) return notFound();

  return (
    <>
      <BannerPages
        title="Nuestros diplomados"
        text="Descubre nuestra selección de diplomados diseñados para potenciar tus habilidades y conocimientos en diversas áreas. Aprende de expertos y avanza en tu desarrollo personal y profesional."
        src="/images/about-us.jpg"
      />
      {/* <section className="mb-12 flex items-center justify-center">
        <div
          className="prose prose-lg px-4 prose-headings:font-cormorant md:px-0"
          dangerouslySetInnerHTML={{ __html: content.data.data.content }}
        />
      </section> */}
      <section className="mb-12 px-4 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 gap-4 justify-self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(2,555px)]">
          {/* <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard /> */}
        </div>
      </section>
      <section className="mb-12 min-h-72 px-4 text-lg md:px-20 lg:px-28">
        <ClientsCarousel />
      </section>

      <TermServices />
    </>
  );
}
