"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import HeaderLink from "./HeaderLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { AlignJustify, X } from "lucide-react";
import { createPortal } from "react-dom";

export default function Header() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [useHeaderWhite, setUseHeaderWhite] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (pathname === "/" || pathname === "/terminos-y-condiciones") {
      setUseHeaderWhite(false);
    } else {
      setUseHeaderWhite(true);
    }
  }, [pathname]);

  const handdleCloseMobile = () => {
    setTimeout(() => {
      setShowMenu(false);
    }, 500);
  };

  return (
    <>
      <header
        className={`relative flex items-center justify-center px-16 pb-4 pt-6 md:justify-around ${useHeaderWhite && "text-white"}`}
      >
        <Link className={`${useHeaderWhite && "rounded-full bg-white"}`} href="/">
          <Image src="/logo.webp" alt="logo" width={66} height={50} />
        </Link>
        <div className="hidden items-center justify-center gap-6 md:flex">
          <HeaderLink className="text-lg" href="/" active={pathname === "/"}>
            Inicio
          </HeaderLink>
          <HeaderLink className="text-lg" href="/nosotros" active={pathname === "/nosotros"}>
            Nosotros
          </HeaderLink>
          <HeaderLink className="text-lg" href="/servicios" active={pathname === "/servicios"}>
            Servicios
          </HeaderLink>
          <HeaderLink className="text-lg" href="/diplomados" active={pathname === "/diplomados"}>
            Diplomados
          </HeaderLink>
        </div>
        <div className="hidden md:flex">
          {!useHeaderWhite ? (
            <Button target="_blank" href="https://api.whatsapp.com/send/?phone=5531202502">
              Agendar cita
            </Button>
          ) : (
            <Button target="_blank" href="https://api.whatsapp.com/send/?phone=5531202502" variant="white">
              Agendar cita
            </Button>
          )}
        </div>
        <div onClick={() => setShowMenu(true)} className="absolute right-4 cursor-pointer md:hidden">
          <AlignJustify size={24} />
        </div>
      </header>

      {isClient &&
        createPortal(
          <div
            className={`fixed left-0 top-0 z-10 h-full w-full transform bg-white transition-all duration-500 ${
              showMenu ? "visible translate-y-0 opacity-100" : "invisible translate-y-full opacity-0"
            }`}
          >
            <div className="flex h-5/6 flex-col items-center justify-center gap-4 pt-16">
              <Link onClick={handdleCloseMobile} href="/">
                <Image src="/logo.webp" alt="logo" width={55} height={50} />
              </Link>
              <HeaderLink onClick={handdleCloseMobile} href="/" active={pathname === "/"}>
                Inicio
              </HeaderLink>
              <HeaderLink onClick={handdleCloseMobile} href="/nosotros" active={pathname === "/nosotros"}>
                Nosotros
              </HeaderLink>
              <HeaderLink onClick={handdleCloseMobile} href="/servicios" active={pathname === "/servicios"}>
                Servicios
              </HeaderLink>
              <HeaderLink onClick={handdleCloseMobile} href="/diplomados" active={pathname === "/diplomados"}>
                Diplomados
              </HeaderLink>
              <Button href="#">Agendar cita</Button>
            </div>
            <div>
              <X size={24} className="absolute right-4 top-10 cursor-pointer" onClick={() => setShowMenu(false)} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
