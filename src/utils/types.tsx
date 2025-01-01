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

export type StrapiResponseDefaultFields<T = object> = {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    publishedAt: string;
  } & T;
};

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

export type StrapiResponseNosotros = StrapiResponseDefaultFields<{
  content: string | TrustedHTML;
}>;

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
