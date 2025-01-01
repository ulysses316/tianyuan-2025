import React from "react";
import { strapi } from "@/utils/strapi";
import { AxiosResponse } from "axios";
import { StrapiResponseServicios } from "@/utils/types";
import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import ServiceCard from "@/components/services/ServiceCard";
import ClientsCarousel from "@/components/clients/ClientsCarousel";
import TermServices from "@/components/services/Terms";

export default async function page() {
  const content: AxiosResponse<StrapiResponseServicios> = await strapi("/api/servicios");
  if (content.status !== 200) return notFound();

  return (
    <>
      <BannerPages
        title="Nuestros servicios"
        text="Ofrecemos una variedad de terapias y prácticas complementarias, que incluyen acupuntura, medicina herbal y curación energética, para promover la salud y el bienestar óptimos."
        src="/images/about-us.jpg"
      />
      <section className="mb-12 px-4 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 justify-self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(3,370px)]">
          {content.data.data.map((service) => (
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
        <ClientsCarousel />
      </section>

      <TermServices />
    </>
  );
}
