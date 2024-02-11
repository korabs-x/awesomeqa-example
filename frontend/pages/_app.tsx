import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import React from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#1C1C1F',
    },
    secondary: {
        main: '#5D50C34D',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#808080',
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
