import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/shared/Button";
import LinkWArrow from "@/components/shared/LinkWArrow";
import ClientsCarousel from "@/components/clients/ClientsCarousel";
import { AxiosResponse } from "axios";
import { StrapiResponseHome, StrapiResponseComments } from "@/utils/types";
import { strapi } from "@/utils/strapi";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const dataHome: AxiosResponse<StrapiResponseHome> = await strapi.get<StrapiResponseHome>(
    "/api/home?populate=imagen_principal",
  );

  return {
    title: "Acupuntura y Terapias en Ecatepec | Tian Yuan",
    description:
      "Centro de acupuntura y medicina tradicional china en Ecatepec de Morelos. Tratamientos para dolor crónico, estrés, problemas ginecológicos y más. Agenda por WhatsApp.",
    openGraph: {
      title: "Acupuntura y Terapias en Ecatepec | Tian Yuan",
      description:
        "Centro de acupuntura y medicina tradicional china en Ecatepec de Morelos. Tratamientos para dolor crónico, estrés, problemas ginecológicos y más. Agenda por WhatsApp.",
      images: [
        {
          url:
            typeof dataHome.data.data?.imagen_principal?.url !== "undefined"
              ? `${dataHome.data.data?.imagen_principal?.url}`
              : "/images/health.jpg",
          width: 1200,
          height: 630,
          alt: "Centro de terapias y acupuntura Tian Yuan",
        },
      ],
    },
  };
}

export default async function Home() {
  let dataHome: AxiosResponse<StrapiResponseHome> | null = null;
  let comments: AxiosResponse<StrapiResponseComments> | null = null;

  const [dataHomeResponse, commentsResponse] = await Promise.allSettled([
    strapi.get<StrapiResponseHome>("/api/home?populate=imagen_principal"),
    strapi.get<StrapiResponseComments>("/api/comentarios"),
  ]);

  if (dataHomeResponse.status === "fulfilled") dataHome = dataHomeResponse.value;
  if (commentsResponse.status === "fulfilled") comments = commentsResponse.value;

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Centro de Terapias y Acupuntura Tian Yuan",
    url: "https://www.terapias-tianyuan.com",
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Centro de Terapias y Acupuntura Tian Yuan",
    url: "https://www.terapias-tianyuan.com",
    telephone: "+525531202502",
    email: "contacto@terapias-tianyuan.com",
    image: "https://www.terapias-tianyuan.com/logo.webp",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5 de Mayo 25",
      addressLocality: "Ecatepec de Morelos",
      addressRegion: "Estado de México",
      postalCode: "55000",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.60163388031027,
      longitude: -99.04383065152842,
    },
    hasMap: "https://maps.app.goo.gl/xh2kmGdzPFDXef4V7",
    sameAs: ["https://api.whatsapp.com/send/?phone=5531202502"],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Acupuntura" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fisioterapia y rehabilitación física" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auriculoterapia" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Moxibustión" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Masajes" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Doula" } },
    ],
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.terapias-tianyuan.com/" },
      { "@type": "ListItem", position: 2, name: "Nosotros", item: "https://www.terapias-tianyuan.com/nosotros" },
      { "@type": "ListItem", position: 3, name: "Servicios", item: "https://www.terapias-tianyuan.com/servicios" },
      { "@type": "ListItem", position: 4, name: "Diplomados", item: "https://www.terapias-tianyuan.com/diplomados" },
      {
        "@type": "ListItem",
        position: 5,
        name: "Términos y condiciones",
        item: "https://www.terapias-tianyuan.com/terminos-y-condiciones",
      },
    ],
  };

  if (!dataHome && !comments) return notFound();

  return (
    dataHome !== null && (
      <>
        <section className="mb-12 grid min-h-[820px] grid-cols-1 items-center gap-16 px-4 md:mb-0 md:grid-cols-2 md:px-20 lg:px-28">
          <div>
            <h1 className="pb-4 font-cormorant text-6xl lg:text-7xl">
              {dataHome.data.data.titulo}{" "}
              <span className="font-bold text-pink-300">{dataHome.data.data.titulo_rosa}</span>
            </h1>
            <p className="text-lg lg:text-xl">{dataHome.data.data.parrafo_principal}</p>
            <div className="mt-7 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center lg:gap-0">
              <Button target="_blank" href="https://api.whatsapp.com/send/?phone=5531202502" className="">
                Agenda una cita
              </Button>
              <LinkWArrow href="/servicios">Explora nuestos servicios</LinkWArrow>
            </div>
          </div>
          <div className="-order-1 justify-self-center md:order-1">
            <div className="relative h-[300px] w-dvw md:h-[500px] md:w-[400px] lg:h-[600px] lg:w-[500px]">
              <Image
                loading="eager"
                priority
                className="object-cover md:rounded-full"
                src={
                  typeof dataHome.data.data?.imagen_principal?.url !== "undefined"
                    ? `${dataHome.data.data?.imagen_principal?.url}`
                    : "/images/health.jpg"
                }
                alt=""
                fill
              />
            </div>
          </div>
        </section>

        <section className="mb-16 px-4 md:px-20 lg:px-28">
          <div className="mb-16 flex flex-col items-center gap-4">
            <h2 className="text-center font-cormorant text-5xl">{dataHome.data.data.mtc_titulo}</h2>
            <p className="w-full text-center text-lg md:w-1/3">{dataHome.data.data.mtc_parrafo}</p>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-4 gap-y-8 sm:grid-cols-3 sm:grid-rows-2">
            <div>
              <h3 className="text-center text-2xl">{dataHome.data.data.mtc_beneficio_1_titulo}</h3>
              <p className="text-center text-lg">{dataHome.data.data.mtc_beneficio_1_texto}</p>
            </div>
            <div className="sm:col-start-1 sm:row-start-2">
              <h3 className="text-center text-2xl">{dataHome.data.data.mtc_beneficio_2_titulo}</h3>
              <p className="text-center text-lg">{dataHome.data.data.mtc_beneficio_2_texto}</p>
            </div>
            <div className="self-center sm:col-start-2 sm:row-span-2 sm:row-start-1">
              <Image src={"/logo.webp"} alt="" width={300} height={300} />
            </div>
            <div className="sm:col-start-3 sm:row-start-1">
              <h3 className="text-center text-2xl">{dataHome.data.data.mtc_beneficio_3_titulo}</h3>
              <p className="text-center text-lg">{dataHome.data.data.mtc_beneficio_3_texto}</p>
            </div>
            <div className="sm:col-start-3">
              <h3 className="text-center text-2xl">{dataHome.data.data.mtc_beneficio_4_titulo}</h3>
              <p className="text-center text-lg">{dataHome.data.data.mtc_beneficio_4_texto}</p>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <Button href="/servicios">Descubre más servicios</Button>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center bg-ty-0 px-4 py-20 text-white md:px-20 lg:px-28">
          <div className="mb-6 flex aspect-square items-center justify-center rounded-full bg-white p-0.5">
            <Image src={"/logo.webp"} alt="" width={75} height={50} />
          </div>
          <p className="text-center text-lg font-light md:text-3xl lg:text-4xl">
            {dataHome.data.data.parrafo_seccion_negra}
          </p>
          {comments !== null && <ClientsCarousel comments={comments.data.data} />}
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      </>
    )
  );
}
