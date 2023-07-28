import * as React from 'react';
import { Typography, Box, Select, Option, Button, ButtonGroup } from '@mui/joy';
import ModeButton from '../ModeButton';
import Link from 'next/link';

const Header: React.FC = () => {

  return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <Select
          placeholder='Home'
          slotProps={{
            listbox: {
              placement: 'top-start',
              sx: {
                paddingX: 2
              }
            },
          }}
        >
          <Link href='/'><Option value="login"><Typography level='h4'>Login</Typography></Option></Link>
          <Link href='/dashboard'><Option value="dashboard"><Typography level='h4'>Dashboard</Typography></Option></Link>
          <Link href='/audience'><Option value="audience"><Typography level='h4'>Address List</Typography></Option></Link>
          <Link href='/content'><Option value="content"><Typography level='h4'>Content List</Typography></Option></Link>
          <Link href='/logs'><Option value="logs"><Typography level='h4'>Logs</Typography></Option></Link>
          <Link href='/manage'><Option value="manage"><Typography level='h4'>Manage</Typography></Option></Link>
        </Select>
        <Typography level='h3'>
          NFT GATED SERVER
        </Typography>
        <ButtonGroup sx={{ display: 'flex', gap: 3}} aria-label="outlined primary button group">
          <ModeButton />
          <Button variant='outlined'>Logout</Button>
        </ButtonGroup>
      </Box>
  );
};

export default Header;