import Image from "next/image";
import Button from "@/components/shared/Button";
import LinkWArrow from "@/components/shared/LinkWArrow";
import ClientsCarousel from "@/components/clients/ClientsCarousel";
import { AxiosResponse } from "axios";
import { StrapiResponseHome, StrapiResponseComments } from "@/utils/types";
import { strapi } from "@/utils/strapi";
import { notFound } from "next/navigation";

export default async function Home() {
  let dataHome: AxiosResponse<StrapiResponseHome> | null = null;
  let comments: AxiosResponse<StrapiResponseComments> | null = null;

  const [dataHomeResponse, commentsResponse] = await Promise.allSettled([
    strapi.get<StrapiResponseHome>("/api/home"),
    strapi.get<StrapiResponseComments>("/api/comentarios"),
  ]);

  if (dataHomeResponse.status === "fulfilled") dataHome = dataHomeResponse.value;
  if (commentsResponse.status === "fulfilled") comments = commentsResponse.value;

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
              <Button href="#" className="">
                Agenda una cita
              </Button>
              <LinkWArrow href="/services">Explora nuestos servicios</LinkWArrow>
            </div>
          </div>
          <div className="-order-1 justify-self-center md:order-1">
            <div className="relative h-[300px] w-dvw md:h-[500px] md:w-[400px] lg:h-[600px] lg:w-[500px]">
              <Image className="object-cover md:rounded-full" src={"/images/health.jpg"} alt="" fill />
            </div>
          </div>
        </section>

        <section className="mb-16 px-4 md:px-20 lg:px-28">
          <div className="mb-16 flex flex-col items-center gap-4">
            <h2 className="text-center font-cormorant text-5xl">Medicina tradicional china</h2>
            <p className="w-full text-center text-lg md:w-1/3">
              La Medicina Tradicional China equilibra cuerpo y mente con técnicas como acupuntura, hierbas y qigong.
            </p>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-4 gap-y-8 sm:grid-cols-3 sm:grid-rows-2">
            <div>
              <h3 className="text-center text-2xl">Alivio del dolor crónico</h3>
              <p className="text-center text-lg">Reduce inflamación y mejora la circulación con acupuntura.</p>
            </div>
            <div className="sm:col-start-1 sm:row-start-2">
              <h3 className="text-center text-2xl">Fortalece el sistema inmunológico</h3>
              <p className="text-center text-lg">Refuerza defensas con hierbas y acupuntura.</p>
            </div>
            <div className="self-center sm:col-start-2 sm:row-span-2 sm:row-start-1">
              <Image src={"/logo.webp"} alt="" width={300} height={300} />
            </div>
            <div className="sm:col-start-3 sm:row-start-1">
              <h3 className="text-center text-2xl">Reducción del estrés</h3>
              <p className="text-center text-lg">Relaja cuerpo y mente con qigong y masajes.</p>
            </div>
            <div className="sm:col-start-3">
              <h3 className="text-center text-2xl">Mejora la digestión</h3>
              <p className="text-center text-lg">Alivia problemas como gastritis con dietética china.</p>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <Button href="/services">Descubre más servicios</Button>
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
      </>
    )
  );
}
