"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";

const fakeTestimonials = [
  {
    id: 0,
    name: "John Doe",
    text: "The staff and the therapy process itself are simply wonderful, I will gladly come back here again.",
    stars: 5,
  },
  {
    id: 1,
    name: "Fulanito",
    text: "The staff and the therapy process itself are simply wonderful, I will gladly come back here again.",
    stars: 4,
  },
  {
    id: 2,
    name: "Cosme Fulanito",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem assumenda praesentium laudantium tempora unde eligendi odio illo distinctio itaque accusamus rem adipisci autem maxime necessitatibus cumque debitis, officiis dolor alias! ",
    stars: 3,
  },
];

export default function ClientsCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const handdleNext = () => {
    if (currentTestimonial === fakeTestimonials.length - 1) {
      setCurrentTestimonial(0);
      return;
    }
    setCurrentTestimonial((prev) => prev + 1);
  };

  const handdlePrev = () => {
    if (currentTestimonial === 0) {
      setCurrentTestimonial(fakeTestimonials.length - 1);
      return;
    }
    setCurrentTestimonial((prev) => prev - 1);
  };

  return (
    <div className="relative mb-40 w-full pt-16">
      <p className="mb-3 text-center text-xl text-pink-300">Testimonio de nuestros clientes</p>
      {fakeTestimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          className={`absolute flex w-full items-center justify-center transition-opacity duration-700 ${index === currentTestimonial ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <p className="text-center">“{testimonial.text}”</p>
            <p className="text-center">{testimonial.name}</p>
            <div className="flex gap-1 pt-1.5">
              {Array.from({ length: testimonial.stars }, (_, i) => (
                <span key={i}>
                  <Star strokeWidth={1} />
                </span>
              ))}
            </div>
            <div className="flex justify-between gap-8">
              <button onClick={handdlePrev}>
                <ChevronLeft />
              </button>
              <button onClick={handdleNext}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
