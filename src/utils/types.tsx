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

export type SVG = {
  className?: string;
};

// export type StrapiResponseDefaultFields = {
//   id: number;
//   documentId: string;
//   createdAt: string;
//   publishedAt: string;
// };

// export type StrapiResponseNosotros = StrapiResponseDefaultFields & {
//   // title: string;
//   content: string | TrustedHTML;
// };

export type StrapiResponseDefaultFields<T = object> = {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    publishedAt: string;
  } & T;
};

export type StrapiResponseNosotros = StrapiResponseDefaultFields<{
  content: string | TrustedHTML;
}>;
