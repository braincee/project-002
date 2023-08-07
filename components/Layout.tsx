import Box from "@mui/joy/Box";
import { PropsWithChildren } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Layout(props: PropsWithChildren) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>NFT Gated Server</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="description" />
      </Head>
      <Box sx={{ width: "100%" }}>{props.children}</Box>
    </>
  );
}
