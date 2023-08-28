import { Button, Grid } from "@mui/joy";
import { useRouter } from "next/router";
import Input from "@mui/joy/Input";
import NFTImage from "@/public/images/nft_image.png";
import Image from "next/image";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

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
            handleLogin(event);
          }}
          method="POST"
        >
          <Input
            placeholder="Enter your email address"
            type="email"
            name="email"
            sx={{ mb: 2, fontSize: "var(--joy-fontSize-sm)" }}
            size="lg"
            required
          />
          <Input
            placeholder="Enter your password"
            type="password"
            sx={{ mb: 2, fontSize: "var(--joy-fontSize-sm)" }}
            size="lg"
            required
          />
          <Button type="submit" loading={loading ? true : false}>
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
  );
}
