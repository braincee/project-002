import { Button, Grid, Input } from "@mui/joy";
import { useRouter } from "next/router";
import NFTImage from "@/public/images/nft_image.png";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

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
    <>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100vh",
          m: 0,
        }}
        spacing={5}
      >
        <Grid
          xs={12}
          md={4}
          sx={{ alignItems: "center", display: "grid", py: 0 }}
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
        <Grid xs={12} md={8} sx={{ py: 0, px: 0, height: "100vh" }}>
          <Image
            className="nft-image"
            src={NFTImage}
            alt="NTF Image"
            style={{ height: "100%", width: "100%" }}
          />
        </Grid>
      </Grid>
    </>
  );
}
