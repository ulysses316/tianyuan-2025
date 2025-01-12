import React from "react";
import { redirect } from "next/navigation";
import type { VideoPageParam } from "@/utils/types";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { strapi } from "@/utils/strapi";
import axios from "axios";
import type { StrapiUserApi, S3SignedUrlVideo } from "@/utils/types";
import type { AxiosResponse } from "axios";
import env from "@/utils/config";

export const dynamic = "force-dynamic";

export default async function page({ params }: VideoPageParam) {
  const { modulo, clase } = await params;
  const session = await getServerSession(authOptions);
  console.log(clase);

  if (!session?.documentId) return redirect("/curso");

  const responseUser: AxiosResponse<StrapiUserApi[]> = await strapi.get(
    `/api/users?filters[documentId][$eq]=${session?.documentId}`,
  );

  const user = responseUser.data[0];

  if (!user || user.modulo.toString() !== modulo.replace("modulo-", "")) return redirect("/curso");

  const videoSrc: AxiosResponse<S3SignedUrlVideo> = await axios.post(`${env.NEXT_PUBLIC_URL}/api/presignedurl`, {
    file_name: `modulo_${modulo.replace("modulo-", "")}/${clase.replace("clase-", "")}.mp4`,
  });

  return (
    <div>
      <video src={videoSrc.data.data.url} controls></video>
    </div>
  );
}
