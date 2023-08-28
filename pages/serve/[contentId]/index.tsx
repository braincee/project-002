import { Address, Content } from "@/libs/models";
//! REMOVE ALL MUI COMPONENTS FROM THIS PAGE
//! IT WAS EXPLAINED TO YOU THAT MUI STYLES ARE NOT IMPORTED IN THIS PAGE, IT IS MEANT TO BE AS LIGHT AS POSSIBLE
import { Box, Button, Typography } from "@mui/joy";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
// import { useAddress } from "@thirdweb-dev/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { contentId } = context.query as any;
  try {
    const content = JSON.stringify(
      await Content.findByPk(contentId, {
        include: { model: Address },
      })
    );
    return {
      props: { content: JSON.parse(content) },
    };
  } catch {
    return {
      props: { content: "No content found" },
    };
  }
};

const ServeContent = ({
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [viewStatus, setViewStatus] = useState<boolean>(false);
  // const [signature, setSignature] = useState('') //! delete
  // const [address, setAddress] = useState('') //! delete
  //! ADD ERRORMESSAGE STATE TO HANDLE DIFFERENCE BETWEEN NO ADDRESS, INVALID ADDRESS, DOES NOT HAVE ACCESS

  // const address = useAddress();
  const message = "I am requesting content";
  const sdk = useSDK();

  let renderedContent; //! change from variable to a useCallback that returns the rendered content based on content.fileType, or error message

  //! RE-WRTIE THIS WEB3 LOGIC
  //! USER PRESSES CONNECT BUTTON
  //! YOU HAVE A USEEFFECT THAT LISTENS FOR `ADDRESS` TO CHANGE (FROM THIRDWEB useADDRESS, NOT YOUR VARIABLE)
  //! WHEN THE USEEFFECT RECEIVES A NON NULL ADDRESS, IT TRIGGERS SDK.WALLET.SIGN
  //! YOU CHECK THE FUNCTION RESPONSE (RECOVER) AND COMPARE THE 2 ADDRESS
  //! IF VALID YOU GET THE CONTENT AND CHECK THE CONTENT.ADDRESSES, IF ADDRESS IS THERE YOU SET VIEW STATUS
  //! THIS IS ALL IN ONE USEEFFECT, NO ADDRESS OR SIGNATURE STATE NEEDED

  const signMessage = async () => {
    const sign = await sdk?.wallet.sign(message);
    if (!sign) {
      throw new Error("No signature");
    }
    setSignature(sign);
  };

  useEffect(() => {
    if (signature) {
      const addr = sdk?.wallet.recoverAddress(message, signature);
      if (!addr) {
        throw new Error("No address");
      }
      setAddress(addr);
    }
  }, [signature]);

  useEffect(() => {
    const contentAddress =
      content.Addresses &&
      content.Addresses.find((myaddress: any) => myaddress.address === address);

    if (contentAddress) {
      setViewStatus(true);
    }
  }, [address]);

  if (content.fileType && content.fileType.startsWith("video")) {
    //! this is bad, see change above to a useCallback
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
        variant="outlined"
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
            height: "100vh",
            //! Remove this padding
            pt: 10,
          }}
        >
          <Typography level="h3">Content Not Found </Typography>
        </Box>
      ) : address && viewStatus ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", height: "100%", p: 10 }}>
            {renderedContent}
            <Typography level="h3">{content.title}</Typography>
            <Typography level="h3">{content.description}</Typography>
          </Box>
        </Box>
      ) : address ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            //! Remove this padding
            pt: 10,
          }}
        >
          <Typography level="h3">
            You do not have access to this content
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            gap: 3,
            zIndex: 20,
          }}
        >
          <ConnectWallet
            className="connect-wallet"
            theme="dark"
            btnTitle="Connect Wallet"
          />
          <Button
            variant="outlined"
            disabled={signature ? true : false}
            onClick={signMessage}
          >
            Sign Message
          </Button>
        </Box>
      )}
    </>
  );
};

export default ServeContent;
