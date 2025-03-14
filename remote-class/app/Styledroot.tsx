"use client"

import { ThemeProvider } from "@mui/material"
import theme from "./utils/theme"
import React from "react"

export function Styledroot ({
    children,
}:Readonly<{children:React.ReactNode}>) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}