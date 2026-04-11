import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/api/", "/curso"],
    },
    sitemap: "https://www.terapias-tianyuan.com/sitemap.xml",
  };
}
