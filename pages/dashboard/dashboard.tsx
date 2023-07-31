import * as React from 'react';
import { styled } from '@mui/joy/styles';
import { Box, Card, Grid, ListItem, Sheet, Stack, Typography } from '@mui/joy';

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
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography level='h3'>Dashboard</Typography>
       <Grid
         container
         rowSpacing={3}
         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
         sx={{ width: '100%' }}
       >
      <Grid xs={12} sm={6}>
        <Card color='primary' variant='outlined' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography level='h4'>Addresses</Typography>
          <Typography level='h3' color='primary'>20</Typography>
        </Card>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card color='primary' variant='outlined' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography level='h4'>Content Files</Typography>
          <Typography level='h3' color='primary'>33</Typography>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card sx={{ minHeight: '300px'}} color='primary' variant='outlined'>Bar Chart</Card>
      </Grid>
      <Grid xs={12} sm={4} spacing={2}>
        <Typography level='h5'>Recent Addresses</Typography>
        <Stack spacing={2}>
          <Item sx={{ textAlign: 'start', backgroundColor: 'inherit'}}>
            <Typography level='h6'>Thdgfhol2337nffh</Typography>
            <Typography color='neutral'>31 July 2023</Typography>
          </Item>
          <Item sx={{ textAlign: 'start', backgroundColor: 'inherit'}}>
            <Typography level='h6'>Thdgfhol2337nffh</Typography>
            <Typography color='neutral'>27 July 2023</Typography>
          </Item>
          <Item sx={{ textAlign: 'start', backgroundColor: 'inherit'}}>
            <Typography level='h6'>Thdgfhol2337nffh</Typography>
            <Typography color='neutral'>25 July 2023</Typography>
          </Item>
        </Stack>
      </Grid>
    </Grid>
    </Box>
    </>
  
   
  );
}