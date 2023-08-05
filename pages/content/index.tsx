import React, { useState } from 'react'
import { Box, Button, Checkbox, Input, Sheet, Stack, Table, Typography, } from '@mui/joy';
import TableToolbar from '../components/TableToolbar';
import MyModal from '../components/MyModal/MyModal';
import { addContent, addContentAddress, getContentItems } from '@/libs/api';
import Layout from '../components/Layout';
import { Address, Content } from '@/libs/models';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const contentItems = JSON.stringify(await Content.findAll({ order: [["created_at", 'DESC']] }));
  const addresses = JSON.stringify(await Address.findAll({ order: [["created_at", 'DESC']] }));

  return { props: { contentItems: JSON.parse(contentItems), addresses: JSON.parse(addresses)} };
}

const ContentList = ({contentItems, addresses}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [contentList, setContentList] = useState(contentItems);

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  const handleSubmit = (event: any) => {
    let inputValue = event.target[0].value;
    setDisable(true);
    event.target[0].value = "";
    addContent({ content: inputValue }).then(() => {
      getContentItems().then((res) => {
        setContentList(res.data.response);
        setDisable(false);
      })
    });
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = contentList.map((contentItem: any) => contentItem.id);
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

  const handleAddAddressAccess = () => {
    selected.forEach((item) => {
      addContentAddress({contentId: item, addressId: selectedOption})
        .then(() => {
          setOpen(false);
        })
    })
  }

  return (
    <Layout>
      <Box sx={{ py: 2, px: 4, display: 'flex', flexDirection: 'column', gap: 2, }}>
        <Typography level='h3'>Content List</Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
        >
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} >
            <Input placeholder='Type an address' sx={{ width: { xs: "100%", md: "50%" } }} />
            <Stack direction="row" spacing={2} >
              <Button type='submit' disabled={disable}>Add Item</Button>
              <Button color='danger'>Remove Item</Button>
            </Stack>
            <Input type='file' sx={{ width: { xs: "100%", md: "20%" } }} />
          </Stack>
        </form>
        <Stack spacing={2}>
          <Typography level='h5' sx={{ textAlign: 'end' }}>Content Total: 15 </Typography>
          <Sheet sx={{ height: 400, overflow: 'auto' }}>
            <TableToolbar
              numSelected={selected.length}
              handleAccess={handleAddressAccess}
              buttonName={"Address"}
              tableHeader={"Items"}
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
                  width: '30px',
                },
                '& thead th:nth-child(2)': {
                  width: '40%',
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
                  <th>Items</th>
                  <th>Address Access</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {contentList.map((contentItem: any, index: number) => {
                  const isItemSelected = isSelected(contentItem.id);
                  return (
                    <tr
                      key={index}
                      onClick={(event) => handleClick(event, contentItem.id)}
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
                      <td><Typography level='h6'>{contentItem.content}</Typography></td>
                      <td>{index + 3}</td>
                      <td><Typography color='neutral'>{new Date(contentItem.created_at).toDateString()}</Typography></td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </Table>
          </Sheet>
          <MyModal
            open={open}
            setOpen={setOpen}
            tableHeading='Add Address Access for selected Content items'
            placeholder='Insert an  address'
            items={addresses}
            handleAddItem={handleAddAddressAccess}
            setSelectedOption={setSelectedOption}
          />
        </Stack>
      </Box>
    </Layout>
  )
}

export default ContentList;