import React from "react";
import { redirect } from "next/navigation";
import type { VideoPageParam } from "@/utils/types";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { strapi } from "@/utils/strapi";
import type { StrapiUserApi } from "@/utils/types";
import type { AxiosResponse } from "axios";

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

  return <div>page</div>;
}
