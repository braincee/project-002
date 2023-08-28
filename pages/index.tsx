import { Button, CssBaseline, GlobalStyles, Grid } from "@mui/joy";
import { useRouter } from "next/router";
import Input from "@mui/joy/Input";
import NFTImage from "@/public/images/nft_image.png";
import Image from "next/image";
// import { initDb } from "@/libs/api";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";

// initDb();

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permananet: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: any) => {
    setLoading(true);
    const email = event.target[0].value;
    const password = event.target[1].value;
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId="4ca916cd2429acbfee7deea1b4a8222b"
    >
      <>
        <Head>
          <title>NFT Gated Server</title>
          <meta name="robots" content="follow, index" />
          <meta name="description" content="description" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: {
              overflowY: "scroll",
            },
            a: {
              textDecoration: "none",
              color: "var(--joy-palette-primary-500)",
            },
            "a:hover": {
              color: "var(--joy-palette-primary-600)",
            },
            "a:active": {
              color: "var(--joy-palette-primary-700)",
            },
            li: {
              paddingLeft: "0 !important",
            },
          }}
        />
        <Grid
          container
          sx={{
            width: "100%",
            minHeight: "98vh",
            mx: "auto",
          }}
          spacing={3}
        >
          <Grid
            lg={4}
            md={6}
            xs={12}
            sx={{ alignItems: "center", display: "grid" }}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Input
                placeholder="Name"
                sx={{ mb: 2, fontSize: "var(--joy-fontSize-sm)" }}
                size="lg"
              />
              <Input
                placeholder="Enter your password"
                sx={{ mb: 2, fontSize: "var(--joy-fontSize-sm)" }}
                size="lg"
              />
              <Button
                type="submit"
                onClick={handleLogin}
                loading={loading ? true : false}
              >
                Submit
              </Button>
            </form>
          </Grid>
          <Grid lg={8} md={6} xs={12} sx={{ minHeight: "100%" }}>
            <Image
              className="nft-image"
              src={NFTImage}
              alt="NTF Image"
              style={{ height: "100%", width: "100%" }}
            />
          </Grid>
        </Grid>
        {/* <div
          style={{
            width: "100%",
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <div
            style={{ alignSelf: "center", gridColumn: "1/1", padding: "10px" }}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleLogin(event);
              }}
              method="POST"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                placeholder="Enter your email address"
                type="email"
                name="email"
                style={{ marginBottom: "10px", padding: "8px" }}
                required
              />
              <input
                placeholder="Enter your password"
                type="password"
                style={{ marginBottom: "10px", padding: "8px" }}
                required
              />
              <div style={{ display: "flex" }}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div style={{ minHeight: "100%", gridColumn: "2/4" }}>
            <Image
              className="nft-image"
              src={NFTImage}
              alt="NTF Image"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div> */}
      </>
    </ThirdwebProvider>
  );
}
