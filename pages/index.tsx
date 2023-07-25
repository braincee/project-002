import { Button } from "@mui/joy";
import Layout from "@/pages/components/Layout"
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";

export default function Index() {
   
    const router = useRouter();

    const handleLogin = () => {
        router.push('./dashboard')
    }

  return (
    <Layout>
      <Typography level="h2" sx={{ mb: "1rem" }}>
       Joy UI
      </Typography>
      <Typography sx={{ mb: "1rem" }}>
        Welcome ✨
      </Typography>
      <Typography component="h2" level="h3">
        Features
      </Typography>
      <Typography>
        View it on{" "}
        <a href="https://github.com">GitHub</a>.
        Created with 💙 by <a href="https://mui.com/">MUI</a>.
      </Typography>
      <Button sx={{ mt: "1rem" }} onClick={handleLogin}>Press Me</Button>
    </Layout>
  );
}
