import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.terapias-tianyuan.com", changeFrequency: "monthly", priority: 1 },
    { url: "https://www.terapias-tianyuan.com/nosotros", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.terapias-tianyuan.com/servicios", changeFrequency: "weekly", priority: 0.9 },
    { url: "https://www.terapias-tianyuan.com/servicios/acupuntura", changeFrequency: "monthly", priority: 0.8 },
    {
      url: "https://www.terapias-tianyuan.com/servicios/fisioterapia-y-rehabilitacion-fisica",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: "https://www.terapias-tianyuan.com/servicios/auriculoterapia", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.terapias-tianyuan.com/servicios/moxibustion", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.terapias-tianyuan.com/servicios/masajes", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.terapias-tianyuan.com/servicios/doula", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.terapias-tianyuan.com/diplomados", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.terapias-tianyuan.com/diplomados/acupuntura", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.terapias-tianyuan.com/diplomados/masoterapia", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.terapias-tianyuan.com/diplomados/auriculoterapia", changeFrequency: "monthly", priority: 0.7 },
    {
      url: "https://www.terapias-tianyuan.com/diplomados/ventosas-terapeuticas",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
