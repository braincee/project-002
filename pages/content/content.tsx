import { CheckBox } from '@mui/icons-material';
import { Box, Button, Checkbox, Input, Sheet, Stack, Table, Typography } from '@mui/joy';
import React from 'react'

const ContentList = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = Array(15).fill(0).map((_, index) => index.toString());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  console.log(selected);
  console.log(Array(15).fill(0).map((_, index) => index.toString()))

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

  return (
    <Box sx={{ py: 2, px: 4, display: 'flex', flexDirection: 'column', gap: 2, }}>
      <Typography level='h3'>Content List</Typography>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} >
        <Input placeholder='Type an address' sx={{ width: { xs: "100%", md: "50%" } }} />
        <Stack direction="row" spacing={2} >
          <Button>Add Item</Button>
          <Button color='danger'>Remove Item</Button>
        </Stack>
        <Input type='file' sx={{ width: { xs: "100%", md: "20%" } }} />
      </Stack>
      <Stack spacing={2}>
        <Typography level='h5' sx={{ textAlign: 'end' }}>Content Total: 15 </Typography>
        <Sheet sx={{ height: 400, overflow: 'auto' }}>
          <Table
            aria-label="stripe table"
            stripe="even"
            stickyHeader
          >
            <thead>
              <tr>
                <th style={{ width: "10%" }}>
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
              {Array(15).fill(0).map((_, index) => {
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
            </tbody>
          </Table>
        </Sheet>
      </Stack>
    </Box>
  )
}

export default ContentList;