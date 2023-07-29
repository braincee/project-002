import * as React from 'react';
import { Typography, Box, Select, Option, Button, ButtonGroup, Link } from '@mui/joy';
import ModeButton from '../ModeButton';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  
  console.log(router.pathname)

  return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <Select
          placeholder={router.pathname == '/' ? 'Home':  `${router.pathname.slice(1)[0].toUpperCase()}${router.pathname.slice(1).slice(1)}`}
          slotProps={{
            listbox: {
              placement: 'top-start',
              sx: {
                paddingX: 2,
                maxHeight: 'fit-content',
                overflow: 'none',
              }
            },
          }}
        >
          <ButtonGroup spacing={1} sx={{ display: {xs: 'flex', md: 'none', justifyContent: 'space-between', }, gap: 3, paddingY: 2, }} aria-label="spacing primary button group">
            <ModeButton />
            <Button variant='outlined'>Logout</Button>
          </ButtonGroup>
          <Link href='/'><Option value="login"><Typography level='h3'>Login</Typography></Option></Link>
          <Link href='/dashboard'><Option value="dashboard"><Typography level='h3'>Dashboard</Typography></Option></Link>
          <Link href='/audience'><Option value="audience"><Typography level='h3'>Address List</Typography></Option></Link>
          <Link href='/content'><Option value="content"><Typography level='h3'>Content List</Typography></Option></Link>
          <Link href='/logs'><Option value="logs"><Typography level='h3'>Logs</Typography></Option></Link>
          <Link href='/manage'><Option value="manage"><Typography level='h3'>Manage</Typography></Option></Link>
        </Select>
        <Typography sx={{ display: { xs: 'none', md: 'flex'}}} level='h3'>
          NFT GATED SERVER
        </Typography>
        <ButtonGroup spacing={1} sx={{ display: {xs: 'none', md: 'flex'}, gap: 3}} aria-label="spacing primary button group">
          <ModeButton />
          <Button variant='outlined'>Logout</Button>
        </ButtonGroup>
      </Box>
  );
};

export default Header;