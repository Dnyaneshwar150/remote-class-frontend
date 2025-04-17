"use client";
import { Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import { Styledroot } from "./Styledroot";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

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
    <html lang='en'>
      <body className={montserrat.className}>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <Box
              sx={{
                position: "relative",
                minHeight: "100vh",
                backgroundColor: "#1e1f26",
                backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 3px, transparent 3px)`,
                backgroundSize: "25px 25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Styledroot>{children}</Styledroot>
            </Box>

            <Toaster
              position='top-center'
              reverseOrder={false}
            />
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
