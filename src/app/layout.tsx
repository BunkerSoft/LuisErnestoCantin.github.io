import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Luis Ernesto Cantin — Ingeniero de Sistemas | Full Stack Developer",
  description:
    "Portafolio profesional de Luis Ernesto Cantin Oviedo. Ingeniero de Sistemas con más de 6 años de experiencia en .NET, Angular, ASP.NET Core y Azure.",
  keywords: [
    "Luis Cantin",
    "full stack developer",
    "NET",
    "Angular",
    "ASP.NET Core",
    "ingeniero de sistemas",
    "desarrollador",
    "portfolio",
    "C#",
    "Azure",
  ],
  authors: [{ name: "Luis Ernesto Cantin Oviedo" }],
  openGraph: {
    title: "Luis Ernesto Cantin — Ingeniero de Sistemas | Full Stack Developer",
    description:
      "Desarrollador Full Stack con más de 6 años de experiencia en .NET, Angular y Azure. Especialista en aplicaciones empresariales escalables.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Ernesto Cantin — Ingeniero de Sistemas | Full Stack Developer",
    description:
      "Desarrollador Full Stack con más de 6 años de experiencia en .NET, Angular y Azure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <link rel="preload" as="image" href="/sequence/ezgif-frame-001.png" />
        <link rel="preload" as="image" href="/sequence/ezgif-frame-002.png" />
        <link rel="preload" as="image" href="/sequence/ezgif-frame-003.png" />
        {children}
      </body>
    </html>
  );
}
