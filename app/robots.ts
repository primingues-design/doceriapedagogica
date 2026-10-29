import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // rotas internas (IA, pagamento) e o painel da criadora não são páginas para o Google
      disallow: ["/api/", "/painel.html"],
    },
    sitemap: "https://doceriapedagogica.com/sitemap.xml",
  };
}
