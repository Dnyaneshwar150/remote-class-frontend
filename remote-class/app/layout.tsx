"use client";
import { Montserrat  } from "next/font/google";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter"
import "./globals.css";
import { Styledroot } from "./Styledroot";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"], 
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body className={montserrat.className}>
      <AppRouterCacheProvider>
        <Styledroot>{children}</Styledroot>
        </AppRouterCacheProvider> 
      </body>
    </html>
  );
}
