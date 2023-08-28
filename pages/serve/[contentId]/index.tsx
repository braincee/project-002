import { Address, Content } from "@/libs/models";
//! REMOVE ALL MUI COMPONENTS FROM THIS PAGE
//! IT WAS EXPLAINED TO YOU THAT MUI STYLES ARE NOT IMPORTED IN THIS PAGE, IT IS MEANT TO BE AS LIGHT AS POSSIBLE
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { ConnectWallet, useAddress, useSDK } from "@thirdweb-dev/react";
import { getContent } from "@/libs/api";
import { useRouter } from "next/router";
// import { useAddress } from "@thirdweb-dev/react";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { contentId } = context.query as any;
//   try {
//     const content = JSON.stringify(
//       await Content.findByPk(contentId, {
//         include: { model: Address },
//       })
//     );
//     return {
//       props: { content: JSON.parse(content) },
//     };
//   } catch {
//     return {
//       props: { content: "No content found" },
//     };
//   }
// };

interface ContentProps {
  url: string;
  fileType: string;
  title: string;
  description: string;
}

const ServeContent = () => {
  const { query } = useRouter();
  const [errorMessage, setErrorMesaage] = useState("No Address");
  const [content, setContent] = useState<ContentProps>();
  //! ADD ERRORMESSAGE STATE TO HANDLE DIFFERENCE BETWEEN NO ADDRESS, INVALID ADDRESS, DOES NOT HAVE ACCESS

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
        <a href={content.url} target="_blank" rel="noopener noreferrer">
          Link to Content
        </a>
      );
    } else {
      return <p>Unsupported Content Type</p>;
    }
  }, [content]); //! change from variable to a useCallback that returns the rendered content based on content.fileType, or error message

  //! RE-WRTIE THIS WEB3 LOGIC
  //! USER PRESSES CONNECT BUTTON
  //! YOU HAVE A USEEFFECT THAT LISTENS FOR `ADDRESS` TO CHANGE (FROM THIRDWEB useADDRESS, NOT YOUR VARIABLE)
  //! WHEN THE USEEFFECT RECEIVES A NON NULL ADDRESS, IT TRIGGERS SDK.WALLET.SIGN
  //! YOU CHECK THE FUNCTION RESPONSE (RECOVER) AND COMPARE THE 2 ADDRESS
  //! IF VALID YOU GET THE CONTENT AND CHECK THE CONTENT.ADDRESSES, IF ADDRESS IS THERE YOU SET VIEW STATUS
  //! THIS IS ALL IN ONE USEEFFECT, NO ADDRESS OR SIGNATURE STATE NEEDED

  useEffect(() => {
    if (address) {
      const compareAddresses = async () => {
        const signature = (await sdk?.wallet.sign(message)) as string;
        const signedAddress = sdk?.wallet.recoverAddress(message, signature);
        console.log("Address", address, "Signed", signedAddress);
        if (signedAddress === address) {
          const content = await getContent({
            contentId: query.contentId?.toString(),
          });
          setContent(content);
          const contentAddress =
            content.Addresses &&
            content.Addresses.find(
              (myaddress: any) => myaddress.address === address
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
          <h3>Sorry, The Address is Invalid!!</h3>
        </div>
      )}
      {address && content && errorMessage === "Does not have access" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <h3>You do not have access to this content</h3>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", height: "100%", padding: 10 }}>
            {renderedContent}
          </div>
        </div>
      )}
    </>
  );
};

export default ServeContent;
// {
//   content === undefined ? (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       <h3>Content Not Found </h3>
//     </div>
//   ) : address && viewStatus ? (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <div style={{ width: "100%", height: "100%", padding: 10 }}></div>
//     </div>
//   ) : address ? (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       <h3>You do not have access to this content</h3>
//     </div>
//   ) : (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         gap: 3,
//         zIndex: 20,
//       }}
//     >
//       <ConnectWallet
//         className="connect-wallet"
//         theme="dark"
//         btnTitle="Connect Wallet"
//       />
//     </div>
//   );
// }
