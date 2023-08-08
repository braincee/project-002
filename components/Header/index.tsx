import * as React from "react";
import {
  Typography,
  Box,
  Select,
  Option,
  Button,
  ButtonGroup,
  Link,
} from "@mui/joy";
import NextLink from 'next/link';
import ModeButton from "../ModeButton";
import { useRouter } from "next/router";
// import Link from 'next/link';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
      <Select
        placeholder={
          router.pathname == "/"
            ? "Home"
            : `${router.pathname.slice(1)[0].toUpperCase()}${router.pathname
                .slice(1)
                .slice(1)}`
        }
        slotProps={{
          listbox: {
            placement: "top-start",
            sx: {
              maxHeight: "fit-content",
              overflow: "none",
            },
          },
        }}
      >
        <ButtonGroup
          spacing={1}
          sx={{
            display: {
              xs: "flex",
              md: "none",
              justifyContent: "space-between",
            },
            gap: 3,
            paddingY: 2,
          }}
          aria-label="spacing primary button group"
        >
          <ModeButton />
          <Button variant="outlined">Logout</Button>
        </ButtonGroup>
        <NextLink href="/"> 
        <Link underline="none">
          <Option value="login">
            <Typography sx={{ padding: 1}} level="h3">Login</Typography>
          </Option>
        </Link>
        </NextLink>
        <NextLink href="/dashboard">
        <Link underline="none">
          <Option value="dashboard">
            <Typography sx={{ padding: 1}} level="h3">Dashboard</Typography>
          </Option>
        </Link>
        </NextLink>
       <NextLink href="/audience">
       <Link underline="none">
          <Option value="audience">
            <Typography sx={{ padding: 1}} level="h3">Address List</Typography>
          </Option>
        </Link>
       </NextLink>
       <NextLink  href="/content">
       <Link underline="none">
          <Option value="content">
            <Typography sx={{ padding: 1}} level="h3">Content List</Typography>
          </Option>
        </Link>
       </NextLink>
       <NextLink href="/logs">
       <Link underline="none">
          <Option value="logs">
            <Typography sx={{ padding: 1}} level="h3">Logs</Typography>
          </Option>
        </Link>
       </NextLink>
       <NextLink href="/manage">
       <Link underline="none">
          <Option value="manage">
            <Typography sx={{ padding: 1}} level="h3">Manage</Typography>
          </Option>
        </Link>
       </NextLink>
      </Select>
      <Typography sx={{ display: { xs: "none", md: "flex" } }} level="h3">
        NFT GATED SERVER
      </Typography>
      <ButtonGroup
        spacing={1}
        sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}
        aria-label="spacing primary button group"
      >
        <ModeButton />
        <Button variant="outlined">Logout</Button>
      </ButtonGroup>
    </Box>
  );
};

export default Header;
