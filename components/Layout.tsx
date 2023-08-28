import Box from "@mui/joy/Box";
import { PropsWithChildren } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";

export default function Layout(props: PropsWithChildren) {
  const router = useRouter();

  return (
    <>
      //! WHY DO YOU HAVE A HEAD BOTH IN _APP AND IN LAYOUT? REMOVE THE ONE HERE
      AND ADD THE META TAGS TO _APP
      <Head>
        <title>NFT Gated Server</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="description" />
      </Head>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        //! WHY IS THIS HERE AFTER WRITING EXPLICITLY TO DELETE IT?
        {router.pathname !== "/" && <Header />}
        <Box sx={{ width: "100%", flexGrow: 1, padding: 2 }}>
          {props.children}
        </Box>
      </Box>
    </>
  );
}
