import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import theme from "@/libs/theme";
import CssBaseline from "@mui/joy/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/libs/createEmotionCache";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Header from "@/components/Header";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { pathname } = useRouter();
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
  if (pathname.includes("serve")) {
    //! MOVE THIRDWEB PROVIDER, HEAD, CSS BASLINE TO /LOGIN PAGE
    //! DELETE CSS VARS PROVIDER (NOT APPLY STYLES)

    //! RETURN ONLY COMPONENT HERE
    return (
      <ThirdwebProvider
        activeChain="ethereum"
        clientId="4ca916cd2429acbfee7deea1b4a8222b"
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>NFT Gated Server</title>
          <meta name="robots" content="follow, index" />
          <meta name="description" content="description" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssVarsProvider
          defaultMode="system"
          theme={theme}
          modeStorageKey="mode-key"
          disableNestedContext
        >
          <CssBaseline />
          <GlobalStyles
            styles={{
              html: {
                overflowY: "scroll",
              },
              a: {
                textDecoration: "none",
                color: "var(--joy-palette-primary-500)",
              },
              "a:hover": {
                color: "var(--joy-palette-primary-600)",
              },
              "a:active": {
                color: "var(--joy-palette-primary-700)",
              },
              li: {
                paddingLeft: "0 !important",
              },
            }}
          />
          <Layout>
            {pathname !== "/" && <Header />}
            <Component {...pageProps} />
          </Layout>
        </CssVarsProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
