import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Karla, Cormorant } from "next/font/google";
import "./globals.css";

const karla = Karla({
  variable: "--font-karla",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Centro de terapias y acupuntura Tian Yuan",
    default: "Centro de terapias y acupuntura Tian Yuan",
  },
  description:
    "En nuestro centro, exploramos diversas rutas hacia el bienestar integral, destacando la efectividad de la acupuntura y otras terapias complementarias. Descubre cómo estas prácticas pueden aliviar el estrés, mejorar tu energía y equilibrar tu cuerpo y mente. ¡Tu camino hacia una vida más saludable comienza aquí!",
  openGraph: {
    title: {
      template: "%s | Centro de terapias y acupuntura Tian Yuan",
      default: "Centro de terapias y acupuntura Tian Yuan",
    },
    siteName: "Centro de terapias y acupuntura Tian Yuan",
    type: "website",
    locale: "es_MX",
    url: "https://www.terapias-tianyuan.com",
  },
  applicationName: "Centro de terapias y acupuntura Tian Yuan",
  keywords: [
    "Acupuntura",
    "Terapias alternativas",
    "Medicina tradicional china",
    "Bienestar integral",
    "Terapias holísticas",
    "Salud natural",
    "Medicina complementaria",
    "Sanación energética",
    "Armonía corporal",
    "Tratamientos naturales",
  ],
  authors: [{ name: "Brisa Arely Oviedo Yañez", url: "https://www.terapias-tianyuan.com" }],
  creator: "Brisa Arely Oviedo Yañez",
  publisher: "Centro de terapias y acupuntura Tian Yuan",
  metadataBase: new URL("https://www.terapias-tianyuan.com"),
  robots: {
    index: true,
    follow: true,
  },
  category: "Salud, Acupuntura, Terapias, Bienestar, Medicina tradicional china, Medicina alternativa, Masoterapia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${karla.variable} ${cormorant.variable} font-karla antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
