import React from "react";
import type { TermsAndConditionsProps } from "@/utils/types";

export default function TermServices({ terms, title, titleId }: TermsAndConditionsProps) {
  return (
    <section className="bg-ty-0 px-4 py-20 text-ty-1000 md:px-20 lg:px-28 xl:px-64">
      {title && (
        <h2 id={titleId} className="pb-6 text-center font-cormorant text-4xl font-bold">
          {title}
        </h2>
      )}
      {terms.map((term) => (
        <div
          key={term.numero}
          className="flex flex-col items-center justify-center gap-4 border-b-2 border-ty-1000 py-14 md:flex-row md:gap-0"
        >
          <div className="w-full text-xl md:w-1/2">
            <p>
              {term.numero < 10 && "0"}
              {term.numero}
            </p>
            <p>{term.titulo}</p>
          </div>
          <div className="w-full text-xl md:w-1/2">
            <p>{term.termino}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
