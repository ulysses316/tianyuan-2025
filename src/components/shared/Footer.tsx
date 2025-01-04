"use client";
import React from "react";
import Image from "next/image";
import HeaderLink from "./HeaderLink";
import { usePathname } from "next/navigation";
import Button from "./Button";
import Whatsapp from "../svg/Whatsapp";
import Facebook from "../svg/Facebook";
import Instagram from "../svg/Instagram";
import Mail from "../svg/Mail";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-pink-100 px-4 pb-16 pt-16 md:px-20 lg:px-40">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <Image src="/logo.webp" alt="logo" width={75} height={55} />
        <div className="flex flex-wrap items-center justify-center gap-8 sm:flex-nowrap">
          <HeaderLink href="/" active={pathname === "/"}>
            Inicio
          </HeaderLink>
          <HeaderLink href="/nosotros" active={pathname === "/nosotros"}>
            Nosotros
          </HeaderLink>
          <HeaderLink href="/servicios" active={pathname === "/servicios"}>
            Servicios
          </HeaderLink>
          <HeaderLink href="/diplomados" active={pathname === "/diplomados"}>
            Diplomados
          </HeaderLink>
        </div>
      </div>
      <hr className="mt-6 border-ty-0/30" />
      <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-2">
        <div className="flex flex-wrap gap-x-8 gap-y-6">
          <a className="text-lg underline" target="_blank" href="https://maps.app.goo.gl/xh2kmGdzPFDXef4V7">
            5 de Mayo 25, San Cristóbal Centro, 55000 Ecatepec de Morelos, Méx.
          </a>
          <a className="text-lg underline" target="_blank" href="tel:5531202502">
            5531202502
          </a>
          <a className="text-lg underline" target="_blank" href="mailto:cecti_tianyuan@gmail.com">
            cecti_tianyuan@gmail.com
          </a>
        </div>
        <div className="md:justify-self-end">
          <h3 className="text-2xl">¿Listo para agendar?</h3>
          <div className="mt-8">
            <Button target="_blank" variant="white" href="https://api.whatsapp.com/send/?phone=5531202502">
              Contáctanos
            </Button>
          </div>
        </div>
      </div>
      <hr className="mb-6 border-ty-0/30" />
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <div className="text-center sm:text-left">
          <p>{year} Centro de Terapias y Acupuntura Tian Yuan</p>
          <Link className="underline" href="/terminos-y-condiciones">
            Terminos y condiciones
          </Link>
        </div>
        <div className="flex gap-4">
          <a href="https://api.whatsapp.com/send/?phone=5531202502" target="_blank" aria-label="Whatsapp">
            <Whatsapp className="w-6" />
          </a>
          <a
            href="https://www.facebook.com/people/Terapias-Integrativas-Tian-Yuan/100091659327893/"
            target="_blank"
            aria-label="Facebook"
          >
            <Facebook className="w-6" />
          </a>
          <a href="https://www.instagram.com/acu_arelyanez/" target="_blank" aria-label="Instagram">
            <Instagram className="w-6" />
          </a>
          <a href="mailto:cecti_tianyuan@gmail.com" aria-label="Correo">
            <Mail className="w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
