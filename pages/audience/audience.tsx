import { Box, Stack, Table, Typography } from '@mui/joy'
import React from 'react'

const AddressList = () => {
  return (
    <Box sx={{ py: 2, px: 4, display: 'flex', flexDirection: 'column', gap: 2, }}>
      <Typography level='h3'>Address List</Typography>
      <Stack spacing={2}>
        <Typography level='h5' sx={{ textAlign: 'end'}}>Total Number of Addresses: 10 </Typography>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Address</th>
              <th>Content Access</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            { Array(10).fill(0).map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
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

export default AddressList;