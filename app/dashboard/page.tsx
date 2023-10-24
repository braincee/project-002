import React from 'react'
import { Box, Card, Grid, List, Stack, Typography } from '@mui/joy'
import BarChart from '@/components/BarChart'
import truncateEthAddress from 'truncate-eth-address'
import { db } from '@/libs/drizzle/db'

async function getAddresses() {
  const response = await db.query.addresses.findMany({
    orderBy: (address, { desc }) => [desc(address.createdAt)],
  })

  return response
}

async function getContentsLength() {
  const response = await db.query.contents.findMany()

  return response.length
}

export default async function Dashboard() {
  const addresses = await getAddresses()
  const contentLength = await getContentsLength()

  return (
    <main>
      <Box
        sx={{ py: 2, px: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ width: '100%', px: { xs: 'auto', md: 5, lg: 20 } }}
        >
          <Grid xs={12} sm={6}>
            <Card
              color='primary'
              variant='outlined'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography level='h4'>Addresses</Typography>
              <Typography level='h3' color='primary'>
                {addresses.length}
              </Typography>
            </Card>
          </Grid>
          <Grid xs={12} sm={6}>
            <Card
              color='primary'
              variant='outlined'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography level='h4'>Content Files</Typography>
              <Typography level='h3' color='primary'>
                {contentLength}
              </Typography>
            </Card>
          </Grid>
          <Grid xs={12} sm={8}>
            <Card
              sx={{ minHeight: '300px' }}
              color='primary'
              variant='outlined'
            >
              <BarChart addresses={addresses} />
            </Card>
          </Grid>
          <Grid xs={12} sm={4} spacing={2}>
            <Typography level='h4'>Recent Addresses</Typography>
            <Stack spacing={1}>
              {addresses.slice(0, 4).map((address: any, index: any) => (
                <List
                  sx={{ textAlign: 'start', backgroundColor: 'inherit' }}
                  key={index}
                >
                  <Typography level='h4'>
                    {truncateEthAddress(address.address)}
                  </Typography>
                  <Typography color='neutral'>
                    {new Date(address.createdAt).toDateString()}
                  </Typography>
                </List>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </main>
  )
}
