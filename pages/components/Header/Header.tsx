import * as React from 'react';
import { Typography, Box, Select, Option, Button, ButtonGroup, Link } from '@mui/joy';
import ModeButton from '../ModeButton';

const Header: React.FC = () => {

  return (
    <Box sx={{ display: 'flex', gap: 55, padding: 3}}>
      <Select defaultValue="Home">
        <Option value="login"><Link href='/' variant='outlined'><Typography level='h3'>Login</Typography></Link></Option>
        <Option value="dashboard"><Link href='/dashboard' variant='outlined'><Typography level='h3'>Dashboard</Typography></Link></Option>
        <Option value="audience"><Link href='/audience' variant='outlined'><Typography level='h3'>Address List</Typography></Link></Option>
        <Option value="content"><Link href='/content' variant='outlined'><Typography level='h3'>Content List</Typography></Link></Option>
        <Option value="logs"><Link href='/logs' variant='outlined'><Typography level='h3'>Logs</Typography></Link></Option>
        <Option value="manage"><Link href='/manage' variant='outlined'><Typography level='h3'>Manage</Typography></Link></Option>
      </Select>
        <Typography level='h3'>
         NFT GATED SERVER
        </Typography>
      <ButtonGroup aria-label="outlined primary button group">
      <ModeButton />
      <Button>Logout</Button>
    </ButtonGroup>
    </Box>
  );
};

export default Header;