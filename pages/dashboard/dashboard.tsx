import * as React from 'react';
import { styled } from '@mui/joy/styles';
import { Box, Grid, Sheet } from '@mui/joy';


const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#d0efff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function Dashboard() {
  return (
    <>
    <Box>
       <Grid
         container
         rowSpacing={1}
         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
         sx={{ width: '100%' }}
       >
      <Grid xs={6}>
        <Item>xs=8</Item>
      </Grid>
      <Grid xs={6}>
        <Item>xs=4</Item>
      </Grid>
      <Grid xs={6}>
        <Item>xs=4</Item>
      </Grid>
      <Grid xs={6}>
        <Item>xs=8</Item>
      </Grid>
    </Grid>
    </Box>
    </>
  
   
  );
}