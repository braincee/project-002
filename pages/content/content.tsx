import React from 'react'
import { Delete, FilterList, Add } from '@mui/icons-material';
import { Box, Button, Checkbox, IconButton, Input, Sheet, Stack, Table, Typography, Tooltip } from '@mui/joy';

interface TableToolbarProps {
  numSelected: number;
  handleAddressAccess: () => void;
}

const TableToolbar = (props: TableToolbarProps) => {
  const { numSelected, handleAddressAccess } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: 'background.level1',
        }),
        borderTopLeftRadius: 'var(--unstable_actionRadius)',
        borderTopRightRadius: 'var(--unstable_actionRadius)',
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          level="h4"
          sx={{ flex: '1 1 100%' }}
          id="tableTitle"
          component="div"
        >
          Items
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Add">
          <Button startDecorator={<Add />} size="sm" color="primary" variant="solid" onClick={() => handleAddressAccess()}>
            Address
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}

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
    console.log("Add button clicked");
  }

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
          <TableToolbar numSelected={selected.length} handleAddressAccess={handleAddressAccess} />
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