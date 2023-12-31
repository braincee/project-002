import { Button, Grid, Input } from "@mui/joy";
import { useRouter } from "next/router";
import NFTImage from "@/public/images/nft_image.png";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import NextProgress from "next-progress";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
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
          height: "100%",
          m: 0,
        }}
        spacing={5}
      >
        <Grid
          xs={12}
          md={4}
          sx={{
            alignItems: "center",
            display: "grid",
            py: 0,
            zIndex: 100,
          }}
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
              name="password"
              sx={{
                mb: 2,
                fontSize: "var(--joy-fontSize-sm)",
              }}
              size="lg"
              required
            />
            <Button type="submit" loading={loading ? true : false}>
              Submit
            </Button>
          </form>
        </Grid>
        <Grid
          xs={12}
          md={8}
          sx={{
            py: 0,
            px: 0,
            height: "100%",
            position: { xs: "absolute", md: "relative" },
          }}
        >
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
