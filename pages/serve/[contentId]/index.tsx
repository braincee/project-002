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
  // const fileType = response.headers.get("Content-Type") || "unknown";
  return {
    props: { content: JSON.parse(content) },
  };
};

const ServeContent = ({
  content,
  // fileType,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  let renderedContent;

  if (content.fileType.startsWith("video")) {
    renderedContent = (
      <video controls src={content.url} sx={{ maxWidth: "100%" }} />
    );
  } else if (content.fileType.startsWith("image")) {
    renderedContent = (
      <img
        src={content.url}
        alt="Content"
        sx={{ maxWidth: "100%", height: "auto" }}
      />
    );
  } else if (content.fileType.startsWith("audio")) {
    renderedContent = <audio controls src={content.url} />;
  } else if (content.fileType === "link") {
    renderedContent = (
      <a href={content.url} target="_blank" rel="noopener noreferrer">
        Link to Content
      </a>
    );
  } else {
    renderedContent = <p>Unsupported Content Type</p>;
  }

  return (
    <>
      <Head>
        <title>NFT Gated Server</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="description" />
      </Head>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", height: "100%", p: 10 }}>
          {renderedContent}
        </Box>
      </Box>
    </>
  );
};

export default ServeContent;
