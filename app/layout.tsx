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
  metadataBase: new URL("https://doceriapedagogica.com"),
  title: {
    default: "IA para Professores: atividades e planos de aula | Doceria Pedagógica",
    template: "%s | Doceria Pedagógica",
  },
  description:
    "Doceria Pedagógica é a plataforma de IA para professores: gere atividades, avaliações, planos de aula e jogos alinhados à BNCC em segundos, prontos para imprimir.",
  keywords: [
    "ia para professores",
    "inteligência artificial para professores",
    "plataforma de ia para professores",
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
    title: "Doceria Pedagógica — a plataforma de IA para professores",
    description:
      "Atividades, avaliações, planos de aula e jogos alinhados à BNCC em segundos, prontos para imprimir.",
    url: "https://doceriapedagogica.com",
    siteName: "Doceria Pedagógica",
    locale: "pt_BR",
    type: "website",
    // imagem que aparece ao compartilhar o link (WhatsApp, Facebook…)
    images: [{ url: "/og/doceria.jpg", width: 1200, height: 630, alt: "Doceria Pedagógica — materiais prontos para imprimir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doceria Pedagógica — Atividades com IA para Professores",
    description:
      "Planos de aula, atividades e jogos pedagógicos prontos em segundos.",
    images: ["/og/doceria.jpg"],
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
            // "Sou eu" (?sou-eu / ?nao-sou-eu): navegador da dona não entra nas estatísticas (ver /js/dp-analytics.js)
            try{var q=location.search;if(/[?&]nao-sou-eu\\b/.test(q))localStorage.removeItem('dp_interno');else if(/[?&]sou-eu\\b/.test(q))localStorage.setItem('dp_interno','1');
              if(localStorage.getItem('dp_interno')==='1')window['ga-disable-G-D20QSCLT8C']=true;}catch(e){}
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D20QSCLT8C');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            var dpInterno=false;try{var dq=location.search;dpInterno=!/[?&]nao-sou-eu\\b/.test(dq)&&(/[?&]sou-eu\\b/.test(dq)||localStorage.getItem('dp_interno')==='1');}catch(e){}
            if(!dpInterno)(function(c,l,a,r,i,t,y){
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
