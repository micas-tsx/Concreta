import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebVitalsProvider } from "@/components/providers/web-vitals-provider";
import { KeyboardShortcutsProvider } from "@/components/providers/keyboard-shortcuts-provider";
import { ReducedMotionProvider } from "@/components/providers/reduced-motion-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CONCRETA - Monitoramento de Obras Públicas",
  description: "Painel de monitoramento urbano para transparência de obras públicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased dark`}>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <ReducedMotionProvider />
        <WebVitalsProvider />
        <KeyboardShortcutsProvider />
        {children}
      </body>
    </html>
  );
}
