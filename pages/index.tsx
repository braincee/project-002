import { Button } from "@mui/joy";
import Layout from "@/pages/components/Layout"
import { useRouter } from "next/router";
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import axios from 'axios';

export default function Index() {
   
    const router = useRouter();

    const handleLogin = () => {
        router.push('./dashboard')
    }

    const test = async () => {
      await axios.get('/api/test');
    }

    test()

  return (
    <Layout>
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          placeholder="Name"
          sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)', width : 400 }}
          size="lg"
        />
        <Input 
        placeholder="Enter your password" 
        sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)', width: 400 }}
        size="lg"
        />
        <Button type="submit" onClick={handleLogin}>Submit</Button>
      </form>
    </Box>
    </Layout>
  );
}
