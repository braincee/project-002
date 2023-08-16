import { Button, Grid, AspectRatio } from "@mui/joy";
import { useRouter } from "next/router";
import Input from "@mui/joy/Input";
import NFTImage from "@/public/images/nft_image.png";
import Image from "next/image";
import { initDb } from "@/libs/api";
import { useState } from "react";

initDb();

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
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
  );
}
