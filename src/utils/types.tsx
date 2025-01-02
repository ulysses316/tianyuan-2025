import { ReactNode } from "react";

export type ButtonProps = {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "black" | "white";
};

export type Layout = {
  children: ReactNode;
};

export type ParamSlug = {
  params: Promise<{ slug: string }>;
};

export type SVG = {
  className?: string;
};

export type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  src?: string;
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
  terms: Array<{
    titulo: string;
    termino: string;
    numero: number;
  }>;
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
}>;

export type StrapiResponseHome = StrapiResponseDefaultFields<{
  titulo: string;
  titulo_rosa: string;
  parrafo_principal: string;
  parrafo_seccion_negra: string;
}>;

export type StrapiResponseServicePage = StrapiResponseDefaultFields<{
  parrafo_principal: string;
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
}>;

export type StrapiResponseServicio = StrapiResponseDefaultFieldsCollection<{
  titulo: string;
  descripcion: string;
  contenido: string | TrustedHTML;
  slug: string;
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
