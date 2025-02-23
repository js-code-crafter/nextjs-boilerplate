"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  //colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default theme;
