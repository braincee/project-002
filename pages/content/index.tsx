import React, { useState } from 'react'
import { Box, Button, Checkbox, Input, Sheet, Stack, Table, Textarea, Typography, } from '@mui/joy';
import TableToolbar from '../components/TableToolbar';
import MyModal from '../components/MyModal/MyModal';
import { addContent, addContentIdAddressIds, getContentItems } from '@/libs/api';
import Layout from '../components/Layout';
import { Address, Content } from '@/libs/models';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const contentItems = JSON.stringify(
    await Content.findAll({ order: [["created_at", 'DESC']], include: {model: Address} })
  );
  const addresses = JSON.stringify(
    await Address.findAll({ order: [["created_at", 'DESC']] })
  );

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
    let title = event.target[0].value;
    let description = event.target[1].value;
    setDisable(true);
    event.target[0].value = "";
    event.target[1].value = "";
    addContent({ title, description }).then(() => {
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
    addContentIdAddressIds({content: selected, addressId: selectedOption})
        .then(() => {
          getContentItems().then((res) => {
            setContentList(res.data.response);
            setOpen(false);
          })
        })
  }

  const handleRemoveAddressAccess = () => {

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
            <Input required placeholder='Add title' sx={{ width: { xs: "100%", md: "35%" } }} />
            <Textarea required placeholder='Add description' sx={{ width: { xs: "100%", md: "45%" }, }} />
            <Button type='submit' disabled={disable}>Add Item</Button>
          </Stack>
          <Input type='file' sx={{ width: { xs: "100%", md: "40%" }, mt: 2, p: 1}} />
        </form>
        <Stack spacing={1}>
          <Typography level='h5' sx={{ textAlign: 'end' }}>Content Total: {contentList.length} </Typography>
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
                  width: '40px',
                },
                '& thead th:nth-child(2)': {
                  width: '25%',
                },
                '& thead th:nth-child(4)': {
                  width: '10%',
                },
                '& thead th:nth-child(5)': {
                  width: '20%',
                },
                '& tr > *:nth-child(n+4)': { textAlign: 'center' },
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
                  <th>Title</th>
                  <th>Description</th>
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
                      <td><Typography level='h6'>{contentItem.title}</Typography></td>
                      <td><Typography level='h6'>{contentItem.description}</Typography></td>
                      <td>{contentItem.Addresses.length}</td>
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
            tableHeading='Add / Remove Address Access for selected Content items'
            placeholder='Select an address'
            items={addresses}
            handleAddItem={handleAddAddressAccess}
            handleRemoveItem={handleRemoveAddressAccess}
            setSelectedOption={setSelectedOption}
          />
        </Stack>
      </Box>
    </Layout>
  )
}

export default ContentList;