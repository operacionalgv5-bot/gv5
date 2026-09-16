import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "GV5 Assessoria - Agência de Marketing Digital",
  description: "Fazemos o seu restaurante vender R$ 15 a cada R$ 1 investido em tráfego pago.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
