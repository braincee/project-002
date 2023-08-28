import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { ConnectWallet, useAddress, useSDK } from "@thirdweb-dev/react";
import { getContent } from "@/libs/api";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const ServeContent = () => {
  const { query } = useRouter();
  const [errorMessage, setErrorMesaage] = useState("");
  const [content, setContent] = useState<any>();

  const address = useAddress();
  const message = "I am requesting content";
  const sdk = useSDK();

  const renderedContent = useCallback(() => {
    if (content && content.fileType.startsWith("video")) {
      return <video controls src={content.url} style={{ maxWidth: "100%" }} />;
    } else if (content && content.fileType.startsWith("image")) {
      return (
        <img
          src={content.url}
          alt="Content"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      );
    } else if (content && content.fileType.startsWith("audio")) {
      return <audio controls src={content.url} />;
    } else if (
      content &&
      (content.fileType === "link" || content.fileType === "unknown")
    ) {
      return (
        <a
          className="content-link"
          style={{
            textDecoration: "none",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "24px",
          }}
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link to Content
        </a>
      );
    }
  }, [content]);

  useEffect(() => {
    if (address) {
      const compareAddresses = async () => {
        const signature = (await sdk?.wallet.sign(message)) as string;
        const signedAddress = sdk?.wallet.recoverAddress(message, signature);
        if (signedAddress === address) {
          const myContent = await getContent({
            contentId: query.contentId?.toString(),
          });
          setContent(myContent.response);
          const contentAddress = myContent.response.Addresses.find(
            (myaddress: any) => myaddress.address == signedAddress
          );
          if (!contentAddress) {
            setErrorMesaage("Does not have access");
          }
        } else {
          setErrorMesaage("Invalid Address");
        }
      };
      compareAddresses();
    }
  }, [address]);

  return (
    <>
      <Head>
        <title>NFT Gated Server</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content="description" />
      </Head>
      {!address && (
        <div
          style={{
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
        </div>
      )}
      {address && errorMessage === "Invalid Address" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <h2 style={{ color: "#0091ff" }}>Sorry, The Address is Invalid!!</h2>
        </div>
      )}
      {address && !content && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Loader />
        </div>
      )}
      {address && content && errorMessage === "Does not have access" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <h2 style={{ color: "#0091ff" }}>
            You do not have access to this content
          </h2>
        </div>
      )}
      {address && content && errorMessage === "" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          {renderedContent()}
        </div>
      )}
    </>
  );
};

export default ServeContent;
