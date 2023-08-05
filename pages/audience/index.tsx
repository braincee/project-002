import { Box, Button, Checkbox, Input, Sheet, Stack, Table, Typography } from '@mui/joy'
import React, { useState } from 'react'
import TableToolbar from '../components/TableToolbar';
import MyModal from '../components/MyModal/MyModal';
import { addAddress, addAddressIdContentIds, getAddress, getAddresses } from '@/libs/api';
import Layout from '../components/Layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Address, Content } from '@/libs/models';

export const getServerSideProps: GetServerSideProps = async () => {
  const addresses = JSON.stringify(
    await Address.findAll({ order: [["created_at", 'DESC']], include: {model: Content} })
  );
  const contentItems = JSON.stringify(
    await Content.findAll({ order: [["created_at", 'DESC']] })
  );

  return { props: { addresses: JSON.parse(addresses), contentItems: JSON.parse(contentItems) } };
}

const AddressList = ({ addresses, contentItems }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [addressList, setAddressList] = useState(addresses);

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  const handleSubmit = (event: any) => {
    let inputValue = event.target[0].value;
    setDisable(true);
    event.target[0].value = "";
    addAddress({ address: inputValue }).then(() => {
      getAddresses().then((res) => {
        setAddressList(res.data.response);
        setDisable(false);
      })
    });
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = addressList.map((address: any) => address.id);
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

  const handleContentAccess = () => {
    setOpen(true);
  }

  const handleAddContentItem = () => {
    addAddressIdContentIds({ addresses: selected, contentId: selectedOption })
      .then(() => {
        setOpen(false);
      })
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
              required
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
          <Typography level='h5' sx={{ textAlign: 'end' }}>Total Number of Addresses: {addressList.length} </Typography>
          <Sheet sx={{ height: 400, overflow: 'auto' }}>
            <TableToolbar
              numSelected={selected.length}
              handleAccess={handleContentAccess}
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
                '& thead th:nth-child(3)': {
                  width: '10%',
                },
                '& thead th:nth-child(4)': {
                  width: '20%',
                },
                '& tr > *:nth-child(n+3)': { textAlign: 'center' },
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
                {addressList.map((address: any, index: number) => {
                  const isItemSelected = isSelected(address.id);
                  return (
                    <tr
                      key={index}
                      onClick={(event) => handleClick(event, address.id)}
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
                      <td><Typography level='h6'>{address.address}</Typography></td>
                      <td>{address.Contents.length}</td>
                      <td><Typography color='neutral'>{new Date(address.created_at).toDateString()}</Typography></td>
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
            placeholder='Select a content item'
            items={contentItems}
            handleAddItem={handleAddContentItem}
            setSelectedOption={setSelectedOption}
          />
        </Stack>
      </Box>
    </Layout>
  )
}

export default AddressList;