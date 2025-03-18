import React from "react";
import Link from "next/link";
import CourseAccordion from "@/components/couses/CourseAccordion";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { strapi } from "@/utils/strapi";
import type { ModulosResponse, StrapiUserApi, StrapiMedia } from "@/utils/types";
import type { AxiosResponse } from "axios";
import type { Metadata } from "next";
import { Lock } from "lucide-react";
import qs from "qs";

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
    strapi.get("api/modulos-cursos?populate[modulo][populate]=video"),
    // strapi.get("api/modulos-cursos?populate[modulo][populate][video][populate]=video")
  ]);
  if (requestUser.status === "fulfilled") responseUser = requestUser.value;
  if (request.status === "fulfilled") response = request.value;

  if (!response || !responseUser) return null;

  const responseSorted = response.data.data.sort((a, b) => {
    const moduloA = parseInt(a.modulo.Modulo.replace(/\D/g, ""), 10) || 0;
    const moduloB = parseInt(b.modulo.Modulo.replace(/\D/g, ""), 10) || 0;

    return moduloA - moduloB;
  });

  const userModules = responseUser?.data[0].modulo.split(",").map((modulo) => modulo.trim());

  // Files of the course

  const query = qs.stringify(
    {
      filters: {
        mime: {
          $in: [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const responseFiles = await strapi.get(`api/upload/files?${query}`);

  return (
    <section className="flex min-h-[32dvh] flex-col gap-4 px-4 py-12 md:px-12">
      {responseSorted &&
        responseSorted.map((modulo) => {
          const numeroDeModulo = parseInt(modulo.modulo?.Modulo.replace(/\D/g, ""), 10) || 0;

          return (
            <CourseAccordion
              key={modulo.documentId}
              number_module={numeroDeModulo}
              lock={userModules?.indexOf(String(numeroDeModulo)) !== -1}
            >
              <div className="flex flex-col gap-2">
                {modulo.modulo?.video?.map((video) => (
                  <Link
                    className="text-lg"
                    key={video.numero_de_clase}
                    href={`/curso/${modulo.documentId}/${video.numero_de_clase}`}
                  >
                    {video.numero_de_clase} - {video.titulo}
                  </Link>
                ))}
              </div>
            </CourseAccordion>
          );
        })}

      <details className="group relative cursor-pointer rounded-lg border-2 border-sky-300 px-4 py-2 text-sm">
        <summary className="font-railey flex items-center justify-between text-2xl text-black">
          Libros y recursos del curso
          {userModules.length === 0 && <Lock />}
        </summary>
        {userModules.length > 0 && (
          <div className="py-2">
            {responseFiles.data.map((file: StrapiMedia) => (
              <div key={file.id}>
                <a href={file.url} target="_blank" rel="noreferrer" className="mb-2 block text-lg">
                  {file.name}
                </a>
              </div>
            ))}
          </div>
        )}
      </details>
    </section>
  );
}
