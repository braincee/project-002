import { Content } from "@/libs/models";
import { Box, Button, Typography } from "@mui/joy";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
// import { useAddress } from '@thirdweb-dev/react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { contentId } = context.query as any;
  try {
    const content = JSON.stringify(await Content.findByPk(contentId));
    return {
      props: { content: JSON.parse(content) },
    };
  } catch {
    console.log("test is null");
    return {
      props: { content: "No content found" },
    };
  }
};

const ServeContent = ({
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  let renderedContent;

  if (content.fileType && content.fileType.startsWith("video")) {
    renderedContent = (
      <video controls src={content.url} style={{ maxWidth: "100%" }} />
    );
  } else if (content.fileType && content.fileType.startsWith("image")) {
    renderedContent = (
      <img
        src={content.url}
        alt="Content"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    );
  } else if (content.fileType && content.fileType.startsWith("audio")) {
    renderedContent = <audio controls src={content.url} />;
  } else if (
    content.fileType &&
    (content.fileType === "link" || content.fileType === "unknown")
  ) {
    renderedContent = (
      <Button
        component="a"
        href={content.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Link to Content
      </Button>
    );
  } else {
    renderedContent = <p>Unsupported Content Type</p>;
  }

  // const address = useAddress();

  // if (!address) return <div>No wallet connected</div>;

  return (
    <>
      <Head>
        <title>NFT Gated Server</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="description" />
      </Head>
      {content === "No content found" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            p: 10,
          }}
        >
          <Typography level="h3">Content Not Found </Typography>
        </Box>
      ) : (
        <ThirdwebProvider
          activeChain="ethereum"
          clientId="4ca916cd2429acbfee7deea1b4a8222b"
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", height: "100%", p: 10 }}>
              {renderedContent}
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <ConnectWallet
                className="connect-wallet"
                theme="dark"
                btnTitle="Connect Wallet"
              />
              {/* <div>My wallet address is {address}</div> */}
            </Box>
          </Box>
        </ThirdwebProvider>
      )}
    </>
  );
};

export default ServeContent;
