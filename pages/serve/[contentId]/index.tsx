import { Content } from "@/libs/models";
import { Box } from "@mui/joy";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { contentId } = context.query as any;
  const content = JSON.stringify(await Content.findByPk(contentId));
  const { url } = JSON.parse(content);
  const response = await fetch(url, {
    method: "HEAD",
  });
  const fileType = response.headers.get("Content-Type") || "unknown";
  return {
    props: { content: JSON.parse(content), fileType },
  };
};

const ServeContent = ({
  content,
  fileType,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(fileType);
  return (
    <>
      <Head>
        <title>NFT Gated Server</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="description" />
      </Head>
      <Box>Content</Box>
    </>
  );
};

export default ServeContent;
