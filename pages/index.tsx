import { Button } from "@mui/joy";
import Layout from "../components/Layout";
import Typography from "@mui/joy/Typography";

export default function Index() {
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
      <Button sx={{ mt: "1rem" }} onClick={() => alert('much wow')}>Press Me</Button>
    </Layout>
  );
}
