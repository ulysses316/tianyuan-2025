import React from "react";
import { redirect } from "next/navigation";
import type { VideoPageParam, SingleModule, StrapiUserApi } from "@/utils/types";
import { strapi } from "@/utils/strapi";
import qs from "qs";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Video from "@/components/couses/Video";
import type { Metadata } from "next";
import { AxiosResponse } from "axios";

export const metadata: Metadata = {
  title: "Clase",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function page({ params }: VideoPageParam) {
  const { documentId, clase } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.documentId) return redirect("/curso");

  const responseUser: AxiosResponse<StrapiUserApi[]> = await strapi.get(
    `/api/users?filters[documentId][$eq]=${session?.documentId}`,
  );

  const user = responseUser.data[0];

  const userModules = responseUser?.data[0].modulo.split(",").map((modulo) => modulo.trim());

  const query = qs.stringify(
    {
      populate: {
        modulo: {
          populate: {
            video: {
              filters: {
                numero_de_clase: {
                  $eq: clase,
                },
              },
              populate: "video",
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const response: AxiosResponse<SingleModule> = await strapi.get(`api/modulos-cursos/${documentId}?${query}`);

  if (!user || userModules.indexOf(response.data.data.modulo.Modulo.replace(/\D/g, "")) === -1)
    return redirect("/curso");

  return (
    <section className="my-12 flex items-center justify-center px-4 md:px-12">
      <Video className="aspect-video w-full md:w-3/4" src={response.data.data.modulo.video[0].video.url} />
    </section>
  );
}
