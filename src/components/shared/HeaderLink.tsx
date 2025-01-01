import React from "react";
import Link from "next/link";

type HeaderLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
};

export default function HeaderLink({ children, className, href, active = false, onClick }: HeaderLinkProps) {
  return (
    <Link onClick={onClick} className={`${className} group relative`} href={href}>
      {children}
      <span
        className={`absolute -bottom-1 left-0 right-0 m-auto h-px w-10/12 rounded-full transition-colors duration-300 group-hover:bg-slate-600 ${active && "bg-slate-600"}`}
      />
    </Link>
  );
}
