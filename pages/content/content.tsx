import { CheckBox } from '@mui/icons-material';
import { Box, Button, Checkbox, Input, Stack, Table, Typography } from '@mui/joy';
import React from 'react'

const ContentList = () => {
  return (
    <Box sx={{ py: 2, px: 4, display: 'flex', flexDirection: 'column', gap: 2, }}>
      <Typography level='h3'>Content List</Typography>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} >
        <Input placeholder='Type an address' sx={{ width: { xs: "100%", md: "50%"}}}/>
        <Stack direction="row" spacing={2} >
          <Button>Add Item</Button>
          <Button color='danger'>Remove Item</Button>
        </Stack>
        <Input type='file' sx={{ width: { xs: "100%", md: "20%"}}} />
      </Stack>
      <Stack spacing={2}>
        <Typography level='h5' sx={{ textAlign: 'end'}}>Content Total: 15 </Typography>
        <Table aria-label="stripe table" stripe="even">
          <thead>
            <tr>
              <th>
                <Checkbox
                  sx={{ verticalAlign: 'sub' }}
                />
              </th>
              <th>Items</th>
              <th>Address Access</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            { Array(15).fill(0).map((_, index) => (
              <tr key={index}>
                <th scope="row">
                    <Checkbox
                      sx={{ verticalAlign: 'top' }}
                    />
                  </th>
                <td><Typography level='h6'>Thdgfhol2337nffh</Typography></td>
                <td>{index + 3}</td>
                <td><Typography color='neutral'>31 July 2023</Typography></td>
              </tr>
            )
            )}
            <tr>

            </tr>
          </tbody>
        </Table>
      </Stack>
    </Box>
  )
}

export default ContentList;