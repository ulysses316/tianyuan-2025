import React, { ReactNode } from "react";
import { Lock } from "lucide-react";

type CourseAccordion = {
  number_module: number;
  children: ReactNode;
  lock: boolean | undefined;
};

export default function CourseAccordion({ number_module, children, lock }: CourseAccordion) {
  return (
    <details className="group relative cursor-pointer rounded-lg border-2 border-sky-300 px-4 py-2 text-sm">
      <summary className="font-railey flex items-center justify-between text-2xl text-black">
        Modulo {number_module}
        {!lock && <Lock />}
      </summary>
      {lock && <div className="py-2">{children}</div>}
    </details>
  );
}
