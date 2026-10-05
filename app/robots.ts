import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // rotas internas (IA, pagamento) não são páginas para o Google
      disallow: ["/api/"],
    },
    sitemap: "https://doceriapedagogica.com/sitemap.xml",
  };
}
