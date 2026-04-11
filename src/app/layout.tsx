import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Karla, Cormorant } from "next/font/google";
import { getServerSession } from "next-auth";
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
  // ✅ Title mejorado — incluye ciudad para SEO local
  title: {
    template: "%s | Tian Yuan Ecatepec",
    default: "Acupuntura y Terapias en Ecatepec | Tian Yuan",
  },

  // ✅ Description más corta y con keywords locales
  // Google trunca a ~155 chars — la tuya tiene 248, se corta en SERPs
  description:
    "Centro de acupuntura y medicina tradicional china en Ecatepec de Morelos. Fisioterapia, auriculoterapia, moxibustión y masajes. Agenda por WhatsApp.",

  // ✅ metadataBase apuntaba a admin.* — crítico, afecta todas las URLs relativas de OG/Twitter
  metadataBase: new URL("https://www.terapias-tianyuan.com"),

  openGraph: {
    title: "Acupuntura y Terapias en Ecatepec | Tian Yuan",
    description:
      "Centro de acupuntura y medicina tradicional china en Ecatepec de Morelos. Fisioterapia, auriculoterapia, moxibustión y masajes.",
    siteName: "Centro de terapias y acupuntura Tian Yuan",
    type: "website",
    locale: "es_MX",
    url: "https://www.terapias-tianyuan.com",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Centro de Terapias y Acupuntura Tian Yuan en Ecatepec",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Acupuntura y Terapias en Ecatepec | Tian Yuan",
    description: "Centro de acupuntura y medicina tradicional china en Ecatepec de Morelos.",
    images: ["/opengraph-image.png"],
  },

  keywords: [
    "acupuntura Ecatepec",
    "acupuntura Estado de México",
    "medicina tradicional china Ecatepec",
    "fisioterapia Ecatepec",
    "auriculoterapia",
    "moxibustión",
    "terapias alternativas CDMX",
    "doula Ecatepec",
    "masajes terapéuticos Ecatepec",
    "bienestar integral Ecatepec",
  ],

  authors: [{ name: "Brisa Arely Oviedo Yañez", url: "https://www.terapias-tianyuan.com" }],
  creator: "Brisa Arely Oviedo Yañez",
  publisher: "Centro de terapias y acupuntura Tian Yuan",
  applicationName: "Centro de terapias y acupuntura Tian Yuan",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Salud",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="es">
      <GoogleTagManager gtmId="GTM-NF52VJCT" />
      <body className={`${karla.variable} ${cormorant.variable} font-karla antialiased`}>
        <Header session={session} />
        <main>{children}</main>
        <Footer session={session} />
      </body>
    </html>
  );
}
