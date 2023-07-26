import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import { Typography } from '@mui/joy';



const Header: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 55, padding: 3}}>
      <Select defaultValue="">
        <Option value="login"><Link href='/' variant='outlined'><Typography level='h1'>Login</Typography></Link></Option>
        <Option value="dashboard"><Link href='/dashboard' variant='outlined'><Typography level='h1'>Dashboard</Typography></Link></Option>
        <Option value="audience"><Link href='/audience' variant='outlined'><Typography level='h1'>Address List</Typography></Link></Option>
        <Option value="content"><Link href='/content' variant='outlined'><Typography level='h1'>Content List</Typography></Link></Option>
        <Option value="logs"><Link href='/logs' variant='outlined'><Typography level='h1'>Logs</Typography></Link></Option>
        <Option value="manage"><Link href='/manage' variant='outlined'><Typography level='h1'>Manage</Typography></Link></Option>
      </Select>
        <Typography level='h3'>
         NFT GATED SERVER
        </Typography>
      <ButtonGroup aria-label="outlined primary button group">
      <Button>Light/Dark</Button>
      <Button>Logout</Button>
    </ButtonGroup>
    </Box>
  );
};

export default Header;