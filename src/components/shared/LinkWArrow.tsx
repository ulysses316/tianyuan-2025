import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type LinkWArrowProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function LinkWArrow({ href, children, className }: LinkWArrowProps) {
  return (
    <Link
      className={`${className} group flex items-center justify-center gap-2 text-lg transition-all duration-300 hover:underline`}
      href={href}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-300 text-sky-300 transition-all duration-300 group-hover:bg-sky-300 group-hover:text-white">
        <ChevronRight size={24} />
      </div>
      {children}
    </Link>
  );
}
