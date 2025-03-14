"use client"
import { createTheme } from "@mui/material";
import { CSS_COLORS, FONT_WEIGHTS } from "./constants";

const theme = createTheme({
  typography: {
    // base font size is 16px, so 1 rem = 16px
    fontFamily: `Montserrat`,
    fontWeightLight: FONT_WEIGHTS.LIGHT,
    fontWeightRegular: FONT_WEIGHTS.MEDIUM,   // 500
    fontWeightMedium: FONT_WEIGHTS.BOLD,       // 700
    fontWeightBold: FONT_WEIGHTS.EXTRA_BOLD, // 800
    h1: {
      fontSize: "2.25rem" /*36px*/,
      fontWeight: FONT_WEIGHTS.EXTRA_BOLD,   //800
      color: CSS_COLORS.BLACK,
    },
    h2: {
      fontSize: "1.5rem" /*24px*/,
      fontWeight: FONT_WEIGHTS.EXTRA_BOLD,
      color: CSS_COLORS.BLACK,
    },

    h3: {
      fontSize: "1.313rem" /*21px*/,
      fontWeight: FONT_WEIGHTS.EXTRA_BOLD,
      color: CSS_COLORS.BLACK,
    },
    h4: {
      fontSize: "1.313rem" /*21px*/,
      fontWeight: FONT_WEIGHTS.BOLD,  //700
      color: CSS_COLORS.BLACK,
    },
    h5: {
      fontSize: "1.313rem" /*22px*/,
      fontWeight: FONT_WEIGHTS.MEDIUM,  //500
      color: CSS_COLORS.BLACK,
    },
    h6: {
      fontSize: "0.75rem" /*12px*/,
      fontWeight: FONT_WEIGHTS.EXTRA_BOLD,
      color: CSS_COLORS.BLACK,
    },
   
  },
  palette: {
    primary: {
      main: CSS_COLORS.PRIMARY_BLUE,
    },
    text: {
      primary: CSS_COLORS.BLACK,
    },
  },
  // components: {
  //   MuiButton: {
  //     defaultProps: {
  //       variant: "contained",
  //     },
  //     styleOverrides: {
  //       root: {
  //         textTransform: "none",
  //         fontSize: "0.75rem",
  //         borderRadius: "0.313rem",
  //         boxShadow: "none",
  //         height: "1.875rem",
  //         padding: "0 1rem",
  //         fontWeight: "var(--fontweight-bold)",
  //         transition: "all 0.3s ease-in",
  //       },
  //       contained: {
  //         backgroundColor: "var(--black)",
  //         color: "var(--primary-white)",
  //         boxShadow: "none",
  //         fontWeight: "var(--fontweight-regular)",
  //         cursor: "pointer",
  //         "&:hover": {
  //           backgroundColor: "var(--black)",
  //           color: "var(--primary-white)",
  //           boxShadow: "none",
  //           fontWeight: "var(--fontweight-regular)",
  //           cursor: "pointer",
  //           transition: "all 0.3s ease-out",
  //         },
  //         "&:active": {
  //           backgroundColor: "var(--black)",
  //           color: "var(--primary-white)",
  //           boxShadow: "none",
  //           fontWeight: "var(--fontweight-regular)",
  //           cursor: "pointer",
  //         },
  //         "&.Mui-disabled": {
  //           backgroundColor: "var(--light-grey)",
  //           color: "var(--dark-grey)",
  //           boxShadow: "none",
  //           fontWeight: "var(--fontweight-regular)",
  //           cursor: "default",
  //         },
  //       },
  //     },
  //     variants: [
  //       {
  //         props: { variant: "outlined" },
  //         style: {
  //           textTransform: "none",
  //           border: `0.5px solid var(--black)`,
  //           borderRadius: ".313rem",
  //           height: "1.875rem",
  //           color: "var(--black)",
  //           width: "fit-content",
  //           boxShadow: "none",
  //           fontWeight: "var(--fontweight-regular)",
  //           cursor: "pointer",

  //           "&:hover": {
  //             backgroundColor: "var(--black)",
  //             color: "var(--primary-white)",
  //             border: "0.5px solid var(--black)",
  //             boxShadow: "none",
  //             fontWeight: "var(--fontweight-regular)",
  //             cursor: "pointer",
  //             transition: "all 0.3s ease-out",
  //           },
  //           "&:active": {
  //             backgroundColor: "var(--black)",
  //             color: "var(--primary-white)",
  //             border: `0.5px solid var(--black)`,
  //             boxShadow: "none",
  //             fontWeight: "var(--fontweight-regular)",
  //             cursor: "pointer",
  //           },
  //           "&.Mui-disabled": {
  //             color: "var(--dark-grey)",
  //             border: "0.5px solid var(--dark-grey)",
  //             boxShadow: "none",
  //             fontWeight: "var(--fontweight-regular)",
  //           },
  //         },
  //       },
  //       {
  //         props: { variant: "text" },
  //         style: {
  //           textTransform: "none",
  //           borderRadius: ".313rem",
  //           height: "1.875rem",
  //           color: "var(--black)",
  //           width: "fit-content",
  //           fontWeight: "var(--fontweight-regular)",
  //           cursor: "pointer",
  //           "&:hover": {
  //             backgroundColor: "var(--black)",
  //             color: "var(--primary-white)",
  //             fontWeight: "var(--fontweight-regular)",
  //             cursor: "pointer",
  //             transition: "all 0.3s ease-out",
  //           },
  //           "&:active": {
  //             backgroundColor: "var(--black)",
  //             color: "var(--primary-white)",
  //             fontWeight: "var(--fontweight-regular)",
  //             cursor: "pointer",
  //           },
  //           "&.Mui-disabled": {
  //             color: "var(--dark-grey)",
  //             boxShadow: "none",
  //             fontWeight: "var(--fontweight-regular)",
  //             cursor: "default",
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   MuiChip: {
  //     defaultProps: {
  //       variant: "filled",
  //     },
  //     variants: [
  //       {
  //         props: { variant: "filled", color: "primary" },
  //         style: {
  //           backgroundColor: "#4DA0F7",
  //           color: "#FFFFFF",
  //           height: "1.78rem",
  //           borderRadius: "4px",
  //           fontSize: "1.5rem",
  //         },
  //       },
  //       {
  //         props: { variant: "filled", color: "secondary" },
  //         style: {
  //           backgroundColor: "#e3e4ea",
  //           color: "#535252",
  //           height: "1.78rem",
  //           borderRadius: "4px",
  //           fontSize: "1.5rem",
  //         },
  //       },
  //     ],
  //   },
   
  //   MuiCard: {
  //     variants: [
  //       {
  //         props: { variant: "elevation" },
  //         style: {
  //           borderRadius: "0.563rem",
  //           boxShadow: "none",
  //           "&:hover": {
  //             boxShadow: "0px 3px 6px var(--box-shadow)",
  //           },
  //         },
  //       },
  //     ],
  //   },

  //   MuiSwitch: {
  //     styleOverrides: {
  //       thumb: {
  //         backgroundColor: "var(--black)",
  //         width: ".875rem",
  //         height: ".875rem",
  //         marginTop: ".07rem",
  //       },
  //       track: {
  //         "&.MuiSwitch-track": { backgroundColor: "var(--light-grey)" },
  //         width: "1.5rem",
  //         height: ".75rem",
  //       },
  //       switchBase: {
  //         "&:hover": { backgroundColor: "transparent" },
  //         "&.Mui-checked": {
  //           "&:hover": { backgroundColor: "transparent" },
  //         },
  //         "&.Mui-checked+.MuiSwitch-track": {
  //           backgroundColor: "var(--light-grey)",
  //           width: "1.5rem",
  //           height: ".75rem",
  //         },
  //       },
  //     },
  //   },
  //   MuiTab: {
  //     styleOverrides: {
  //       root: {
  //         fontSize: "0.875rem",
  //         color: "var(--dark-grey)",
  //         fontWeight: "var(--fontweight-light)",
  //       },
  //     },
  //   },
  //   MuiTooltip: {
  //     defaultProps: { enterDelay: 1000 },
  //     styleOverrides: {
  //       tooltip: {
  //         fontSize: "0.625rem",
  //         lineHeight: "0.875rem",
  //         backgroundColor: "var(--black)",
  //         fontWeight: "var(--fontweight-light)",
  //       },
  //       arrow: { color: "var(--black)" },
  //     },
  //   },
  //   MuiRadio: {
  //     styleOverrides: {
  //       root: {
  //         padding: 0,
  //         "&.Mui-checked": {
  //           color: "var(--black)",
  //         },
  //       },
  //     },
  //   },
  // },
});
export default theme;