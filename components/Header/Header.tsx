import * as React from 'react';
import { Typography, Box, Select, Option, Button, ButtonGroup } from '@mui/joy';
import ModeButton from '../ModeButton';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header: React.FC = () => {
  const router = useRouter();

  return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <Select
          placeholder={router.pathname == '/' ? 'Home':  `${router.pathname.slice(1)[0].toUpperCase()}${router.pathname.slice(1).slice(1)}`}
          slotProps={{
            listbox: {
              placement: 'top-start',
              sx: {
                paddingX: 2
              }
            },
          }}
        >
          <Option value="login"><Link href='/'><Typography level='h4'>Login</Typography></Link></Option>
          <Option value="dashboard"><Link href='/dashboard'><Typography level='h4'>Dashboard</Typography></Link></Option>
          <Option value="audience"><Link href='/audience'><Typography level='h4'>Address List</Typography></Link></Option>
          <Option value="content"><Link href='/content'><Typography level='h4'>Content List</Typography></Link></Option>
          <Option value="logs"><Link href='/logs'><Typography level='h4'>Logs</Typography></Link></Option>
          <Option value="manage"><Link href='/manage'><Typography level='h4'>Manage</Typography></Link></Option>
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