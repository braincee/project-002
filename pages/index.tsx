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
        maxWidth: "1000px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        mx: "auto",
        mt: { xs: "2rem", md: "6rem" },
        p: "2rem",
      }}
      spacing={3}
    >
      <Grid lg={4} md={6} xs={12}>
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
      <Grid lg={8} md={6} xs={12}>
        <AspectRatio variant="outlined" objectFit="fill">
          <Image
            className="nft-image"
            src={NFTImage}
            layout="fill"
            alt="NTF Image"
          />
        </AspectRatio>
      </Grid>
    </Grid>
  );
}
