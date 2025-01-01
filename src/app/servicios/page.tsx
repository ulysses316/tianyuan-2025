import React from "react";
// import { strapi } from "@/utils/strapi";
// import { AxiosResponse } from "axios";
// import { StrapiResponseNosotros } from "@/utils/types";
// import { notFound } from "next/navigation";
import BannerPages from "@/components/shared/BannerPages";
import ServiceCard from "@/components/services/ServiceCard";

export default async function page() {
  // const content: AxiosResponse<StrapiResponseNosotros> = await strapi("/api/nosotro");
  // if (content.status !== 200) return notFound();

  return (
    <>
      <BannerPages
        title="Nuestros servicios"
        text="Ofrecemos una variedad de terapias y prácticas complementarias, que incluyen acupuntura, medicina herbal y curación energética, para promover la salud y el bienestar óptimos."
        src="/images/about-us.jpg"
      />
      {/* <section className="mb-12 flex items-center justify-center">
        <div
          className="prose prose-lg px-4 prose-headings:font-cormorant md:px-0"
          dangerouslySetInnerHTML={{ __html: content.data.data.content }}
        />
      </section> */}
      <section className="mb-12 px-4 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </section>
    </>
  );
}
