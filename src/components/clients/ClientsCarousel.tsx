"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import type { CommentsCarouselProps } from "@/utils/types";

export default function ClientsCarousel({ comments }: CommentsCarouselProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const handdleNext = () => {
    if (currentTestimonial === comments.length - 1) {
      setCurrentTestimonial(0);
      return;
    }
    setCurrentTestimonial((prev) => prev + 1);
  };

  const handdlePrev = () => {
    if (currentTestimonial === 0) {
      setCurrentTestimonial(comments.length - 1);
      return;
    }
    setCurrentTestimonial((prev) => prev - 1);
  };

  return (
    <div className="relative mb-40 w-full pt-16">
      <p className="mb-3 text-center text-xl text-pink-300">Testimonio de nuestros clientes</p>
      {comments.map((testimonial, index) => (
        <div
          key={testimonial.id}
          className={`absolute flex w-full items-center justify-center transition-opacity duration-700 ${index === currentTestimonial ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <p className="text-center">“{testimonial.comentario}”</p>
            <p className="text-center">{testimonial.nombre}</p>
            <div className="flex gap-1 pt-1.5">
              {Array.from({ length: testimonial.estrellas }, (_, i) => (
                <span key={i}>
                  <Star strokeWidth={1} />
                </span>
              ))}
            </div>
            <div className="flex justify-between gap-8">
              <button aria-label="Comentario anterior" onClick={handdlePrev}>
                <ChevronLeft />
              </button>
              <button aria-label="Comentario siguiente" onClick={handdleNext}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
