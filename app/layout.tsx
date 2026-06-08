import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import CookieBanner from "./components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Doceria Pedagógica — Atividades e Planos de Aula com IA",
    template: "%s | Doceria Pedagógica",
  },
  description:
    "Gere atividades, planos de aula, jogos e materiais pedagógicos alinhados à BNCC em segundos. Pronto para imprimir. Para professores brasileiros.",
  keywords: [
    "atividades pedagógicas",
    "plano de aula",
    "BNCC",
    "inteligência artificial",
    "materiais para professores",
    "atividades para imprimir",
    "educação infantil",
    "fundamental",
    "cruzadinha",
    "caça-palavras",
  ],
  authors: [{ name: "Doceria Pedagógica" }],
  openGraph: {
    title: "Doceria Pedagógica — Atividades e Planos de Aula com IA",
    description:
      "Gere atividades, planos de aula e materiais alinhados à BNCC em segundos. Pronto para imprimir.",
    url: "https://doceriapedagogica.com",
    siteName: "Doceria Pedagógica",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doceria Pedagógica — Atividades com IA para Professores",
    description:
      "Planos de aula, atividades e jogos pedagógicos prontos em segundos.",
  },
  verification: {
    google: "FqfYkNg6Cv9BtVUeRa9YRylylOHduILeGaI2WWSTEQg",
  },
  other: {
    "p:domain_verify": "5c3d58fde501e6299a87f3454a4ea932",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
        <Script src="/js/dp-auth.js" strategy="afterInteractive" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D20QSCLT8C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D20QSCLT8C');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x30n5e0ymc");
          `}
        </Script>
      </body>
    </html>
  );
}
