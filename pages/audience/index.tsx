import { Box, Button, Checkbox, Input, Modal, ModalDialog, Sheet, Stack, Table, Typography } from '@mui/joy'
import React, { useState } from 'react'
import TableToolbar from '../components/TableToolbar';
import MyModal from '../components/MyModal/MyModal';
import { addAddress } from '@/libs/api';
import Layout from '../components/Layout';

const AddressList = () => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  const handleSubmit = (event: any) => {
    let inputValue = event.target[0].value;
    setDisable(true);
    event.target[0].value = "";
    addAddress({ address: inputValue }).then(() => {
      setDisable(false);
    });
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = Array(15).fill(0).map((_, index) => index.toString());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, index: string) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleAddressAccess = () => {
    setOpen(true);
  }

  return (
    <Layout>
      <Box sx={{ py: 2, px: 4, display: 'flex', flexDirection: 'column', gap: 2, }}>
        <Typography level='h3'>Address List</Typography>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
        >
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} >
            <Input
              placeholder='Type an address'
              sx={{ width: { xs: "100%", md: "50%" } }}
            />
            <Stack direction="row" spacing={2} >
              <Button type='submit' disabled={disable}>Add Address</Button>
              <Button color='danger'>Remove Address</Button>
            </Stack>
          </Stack>
        </form>

        <Stack spacing={2}>
          <Typography level='h5' sx={{ textAlign: 'end' }}>Total Number of Addresses: 10 </Typography>
          <Sheet sx={{ height: 400, overflow: 'auto' }}>
            <TableToolbar
              numSelected={selected.length}
              handleAccess={handleAddressAccess}
              buttonName={"Content"}
              tableHeader={"Addresses"}
            />
            <Table
              aria-label="stripe table"
              stripe="even"
              stickyHeader
              hoverRow
              sx={{
                '--TableCell-headBackground': 'transparent',
                '--TableCell-selectedBackground': (theme) =>
                  theme.vars.palette.primary.softBg,
                '& thead th:nth-child(1)': {
                  width: '40px',
                },
                '& thead th:nth-child(2)': {
                  width: '20%',
                },
                '& tr > *:nth-child(n+3)': { textAlign: 'right' },
              }}
            >
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      onChange={handleSelectAllClick}
                      sx={{ verticalAlign: 'sub' }}
                    />
                  </th>
                  <th>Address</th>
                  <th>Content Access</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {Array(10).fill(0).map((_, index) => {
                  const isItemSelected = isSelected(index.toString());
                  return (
                    <tr
                      key={index}
                      onClick={(event) => handleClick(event, index.toString())}
                      role="checkbox"
                      tabIndex={-1}
                      aria-checked={isItemSelected}
                      style={
                        isItemSelected
                          ? ({
                            '--TableCell-dataBackground':
                              'var(--TableCell-selectedBackground)',
                            '--TableCell-headBackground':
                              'var(--TableCell-selectedBackground)',
                          } as React.CSSProperties)
                          : {}
                      }
                    >
                      <th scope="row">
                        <Checkbox
                          checked={isItemSelected}
                          sx={{ verticalAlign: 'top' }}
                        />
                      </th>
                      <td><Typography level='h6'>Thdgfhol2337nffh</Typography></td>
                      <td>{index + 3}</td>
                      <td><Typography color='neutral'>31 July 2023</Typography></td>
                    </tr>
                  )
                }
                )}
                <tr>

                </tr>
              </tbody>
            </Table>
          </Sheet>
          <MyModal
            open={open}
            setOpen={setOpen}
            tableHeading='Add Content Access for selected Addresses'
            placeholder='Insert a content item'
          />
        </Stack>
      </Box>
    </Layout>
  )
}

export default AddressList;