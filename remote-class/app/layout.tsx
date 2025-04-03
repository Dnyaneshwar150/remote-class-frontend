"use client";
import { Montserrat  } from "next/font/google";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter"
import "./globals.css";
import { Styledroot } from "./Styledroot";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Box, Container } from "@mui/material";

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
      <Provider store={store}>
      <AppRouterCacheProvider>
      <Box
              sx={{
                position: "relative",
                minHeight: "100vh",
                backgroundColor: "var(--dark-grey)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
             <Container
                maxWidth="sm" 
              >
             <Styledroot>{children}</Styledroot>
              </Container>

            </Box>


        </AppRouterCacheProvider> 
        </Provider>

      </body>
    </html>
  );
}
