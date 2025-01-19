import React from "react";
import Link from "next/link";
import CourseAccordion from "@/components/couses/CourseAccordion";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { strapi } from "@/utils/strapi";
import type { ModulosResponse, StrapiUserApi } from "@/utils/types";
import type { AxiosResponse } from "axios";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cursos",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function page() {
  const session = await getServerSession(authOptions);
  let responseUser: AxiosResponse<StrapiUserApi[]> | null = null;
  let response: AxiosResponse<ModulosResponse> | null = null;

  const [requestUser, request] = await Promise.allSettled([
    strapi.get(`/api/users?filters[documentId][$eq]=${session?.documentId}`),
    strapi.get("api/modulos", {
      params: {
        populate: {
          modulo: {
            populate: "*",
          },
        },
      },
    }),
  ]);

  if (requestUser.status === "fulfilled") responseUser = requestUser.value;
  if (request.status === "fulfilled") response = request.value;

  if (!response && !responseUser) return null;

  const userModules = responseUser?.data[0].modulo;

  return (
    <section className="flex min-h-[32dvh] flex-col gap-4 px-4 py-12 md:px-12">
      {response &&
        response.data.data.map((modulo) => {
          const numeroDeModulo = modulo.modulo[0]?.numero_de_modulo;

          return (
            <CourseAccordion
              key={modulo.documentId}
              number_module={numeroDeModulo}
              lock={userModules?.includes(String(numeroDeModulo))}
            >
              <div className="flex flex-col gap-2">
                {modulo.modulo[0]?.video?.map((video) => (
                  <Link
                    key={video.numero_de_clase}
                    href={`/curso/modulo-${numeroDeModulo}/clase-${video.numero_de_clase}`}
                  >
                    {video.numero_de_clase} - {video.titulo}
                  </Link>
                ))}
              </div>
            </CourseAccordion>
          );
        })}
    </section>
  );
}
