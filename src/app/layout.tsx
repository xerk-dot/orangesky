import "~/styles/globals.css";

import { Header } from "./_components/main-page_ui/header";
import { Footer } from "./_components/main-page_ui/footer";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { HeaderBar } from "./_components/main-page_ui/headerbar";
import ClientOnly from "./_components/ClientOnly";
import { BackgroundSlider } from "./_components/main-page_ui/BackgroundSlider";
import Title from "./_components/Title";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "OrangeSky",
  description: "OrangeSky is a BlueSky observability platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Header />
        <Title />
        
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}
