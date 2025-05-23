import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

export type ButtonProps = {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "black" | "white";
  target?: string;
};

export type Layout = {
  children: ReactNode;
};

export type ParamSlug = {
  params: Promise<{ slug: string }>;
};

export type VideoPageParam = {
  params: Promise<{ documentId: string; clase: string }>;
};

export type SVG = {
  className?: string;
};

export type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  src: string | StaticImport;
};

export type DiplomadoCardProps = {
  title: string;
  description: string;
  href: string;
  src: string;
};

export type CommentsCarouselProps = {
  comments: Array<{
    id: number;
    nombre: string;
    comentario: string;
    estrellas: number;
  }>;
};

export type TermsAndConditionsProps = {
  title?: string;
  titleId?: string;
  terms: StrapiResponseTerms["data"];
};

// Single Types
// Base Single Types
export type StrapiResponseDefaultFields<T = object> = {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    publishedAt: string;
  } & T;
};

export type StrapiResponseNosotros = StrapiResponseDefaultFields<{
  contenido: string | TrustedHTML;
  descripcion: string;
  imagen: StrapiMedia;
}>;

export type StrapiResponseHome = StrapiResponseDefaultFields<{
  titulo: string;
  titulo_rosa: string;
  parrafo_principal: string;
  parrafo_seccion_negra: string;
  imagen_principal: StrapiMedia;
  mtc_titulo: string;
  mtc_parrafo: string;
  mtc_beneficio_1_titulo: string;
  mtc_beneficio_2_titulo: string;
  mtc_beneficio_3_titulo: string;
  mtc_beneficio_4_titulo: string;
  mtc_beneficio_1_texto: string;
  mtc_beneficio_2_texto: string;
  mtc_beneficio_3_texto: string;
  mtc_beneficio_4_texto: string;
}>;

export type StrapiResponseServicePage = StrapiResponseDefaultFields<{
  parrafo_principal: string;
  imagen: StrapiMedia;
}>;

export type StrapiResponseDiplomadosPage = StrapiResponseDefaultFields<{
  parrafo_principal: string;
  imagen: StrapiMedia;
}>;

// Collection types
// Base Collection types

export type StrapiResponseDefaultFieldsCollection<T = object> = {
  data: Array<
    {
      id: number;
      documentId: string;
      createdAt: string;
      publishedAt: string;
    } & T
  >;
};

export type StrapiResponseServicios = StrapiResponseDefaultFieldsCollection<{
  titulo: string;
  descripcion: string;
  contenido: string | TrustedHTML;
  slug: string;
  imagen: StrapiMedia;
  orden_en_la_pagina: number;
}>;

export type StrapiResponseServicio = StrapiResponseDefaultFieldsCollection<{
  titulo: string;
  descripcion: string;
  contenido: string | TrustedHTML;
  slug: string;
  imagen: StrapiMedia;
}>;

export type StrapiResponseDiplomado = StrapiResponseDefaultFieldsCollection<{
  titulo: string;
  descripcion: string;
  contenido: string | TrustedHTML;
  slug: string;
  imagen: StrapiMedia;
  orden_en_la_pagina: number;
}>;

export type StrapiResponseComments = StrapiResponseDefaultFieldsCollection<{
  nombre: string;
  comentario: string;
  estrellas: number;
  tipo: "servicio" | "diplomado";
}>;

export type StrapiResponseTerms = StrapiResponseDefaultFieldsCollection<{
  titulo: string;
  termino: string;
  numero: number;
}>;

export type ModulosResponse = StrapiResponseDefaultFieldsCollection<{
  id: number;
  modulo: {
    id: number;
    Modulo: string;
    video: Video[];
  };
}>;

export type SingleModule = {
  data: {
    id: number;
    modulo: {
      id: number;
      Modulo: string;
      video: Video[];
    };
  };
};

export type Video = {
  id: number;
  titulo: string;
  numero_de_clase: number;
  video: StrapiMedia;
};

// Strapi Media Types

export type StrapiMedia = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: FormatStrapiMedia;
    small: FormatStrapiMedia;
    medium: FormatStrapiMedia;
    thumbnail: FormatStrapiMedia;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type FormatStrapiMedia = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type StrapiUserApi = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  modulo: string;
};

export type StrapiUserAuth = {
  jwt: string;
  user: StrapiUserApi;
};

export type S3SignedUrlVideo = {
  ok: boolean;
  data: {
    url: string;
  };
};
