import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import { Typography } from '@mui/joy';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';


const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? 'Turn light' : 'Turn dark'}
    </Button>
  );
}


const Header: React.FC = () => {

  const [node, setNode] = React.useState<HTMLElement | null>(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('mode-toggle'));
  }, []);

  return (
    <CssVarsProvider
         // the element to apply [data-joy-color-scheme] attribute.
         colorSchemeNode={node || null}
         //
         // the selector to apply the CSS theme variables stylesheet.
         colorSchemeSelector="#mode-toggle"
         //
         // the local storage key to use.
         modeStorageKey="mode-toggle-demo"
    >
        <Box sx={{ display: 'flex', gap: 55, padding: 3}}>
      <Select defaultValue="Home">
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
      <ModeSwitcher />
      <Button>Logout</Button>
    </ButtonGroup>
    </Box>
    </CssVarsProvider>
  
  );
};

export default Header;