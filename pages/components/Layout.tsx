import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import { PropsWithChildren } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Layout(props: PropsWithChildren) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>title</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="description" />
      </Head>
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "1000px",
          display: "flex",
          flexGrow: 1,
          flexDirection: { xs: "column", md: "row" },
          mx: "auto",
          mt: { xs: "2rem", md: "6rem" },
          p: "2rem",
        }}
      >
        <Box sx={{width: "100%"}}>{props.children}</Box>
      </Grid>
    </>
  );
}
