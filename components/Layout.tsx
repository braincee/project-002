import Box from "@mui/joy/Box";
import { PropsWithChildren } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Layout(props: PropsWithChildren) {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", flexGrow: 1 }}>{props.children}</Box>
      </Box>
    </>
  );
}
