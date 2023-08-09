import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import TableToolbar from "@/components/TableToolbar";
import MyModal from "@/components/MyModal";
import {
  addAddress,
  addContentIdAddressIds,
  getAddresses,
  removeContentIdAddressIds,
} from "@/libs/api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Address, Content } from "@/libs/models";
import TableHead from "@/components/TableHead";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";
import MainModal from "@/components/MainModal";
import TableBody from "@/components/TableBody";
import TableFoot from "@/components/TableFoot";

export const getServerSideProps: GetServerSideProps = async () => {
  const addresses = JSON.stringify(
    await Address.findAll({
      order: [["created_at", "DESC"]],
      include: { model: Content },
    })
  );
  const contentItems = JSON.stringify(
    await Content.findAll({ order: [["created_at", "DESC"]] })
  );

  return {
    props: {
      addresses: JSON.parse(addresses),
      contentItems: JSON.parse(contentItems),
    },
  };
};

interface Data {
  id: string;
  address?: string;
  title?: string;
  description?: string;
  Contents?: any[];
  Addresses?: any[];
  created_at: Date;
}

const AddressList = ({
  addresses,
  contentItems,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("Contents");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openMain, setOpenMain] = useState(false);
  const [disable, setDisable] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [addressList, setAddressList] = useState<any[]>(addresses);
  const [selectedContents, setSelectedContents] = useState<any[]>([]);

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  const handleSubmit = (event: any) => {
    let inputValue = event.target[0].value;
    setDisable(true);
    event.target[0].value = "";
    addAddress({ address: inputValue }).then(() => {
      getAddresses().then((res) => {
        setAddressList(res.response);
        setDisable(false);
      });
    });
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
    setRowsPerPage(parseInt(newValue!.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (addressList.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? addressList.length
      : Math.min(addressList.length, (page + 1) * rowsPerPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - addressList.length) : 0;

  const handleContentAccess = () => {
    setOpen(true);
  };
  const handleAddAddress = () => {
    setOpenMain(true);
  };

  const handleAddContentItemAccess = () => {
    addContentIdAddressIds({
      addressIds: selected,
      contentId: selectedOption,
    }).then(() => {
      getAddresses().then((res) => {
        setAddressList(res.response);
        setSelected([]);
        setOpen(false);
      });
    });
  };

  const handleRemoveContentItemAccess = () => {
    removeContentIdAddressIds({
      addressIds: selected,
      contentId: selectedOption,
    }).then(() => {
      getAddresses().then((res) => {
        setAddressList(res.response);
        setSelected([]);
        setOpen(false);
      });
    });
  };

  const labelDisplayedRows = ({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }) => {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  };

  const descendingComparator = <T extends {}>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  type Order = "asc" | "desc";

  const getComparator = <Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): ((
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = <T extends {}>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  return (
    <Box sx={{ px: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Stack spacing={2}>
        <Sheet
          variant="outlined"
          sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}
        >
          <TableToolbar
            numSelected={selected.length}
            handleAccess={handleContentAccess}
            buttonName={"Content"}
            tableHeader={"Address List"}
            handleAdd={handleAddAddress}
          />
          <Table
            aria-label="stripe table"
            stripe="even"
            hoverRow
            sx={{
              "--TableCell-headBackground": "transparent",
              "--TableCell-selectedBackground": (theme) =>
                theme.vars.palette.primary.softBg,
              "& thead th:nth-child(1)": {
                width: "5%",
              },
              "& thead th:nth-child(2)": {
                width: "55%",
              },
              "& thead th:nth-child(3)": {
                width: "20%",
              },
              "& thead th:nth-child(4)": {
                width: "20%",
              },
              "& tr > *:nth-child(n+3)": { textAlign: "center" },
            }}
          >
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={addressList.length}
              name="Address"
            />
            {addressList.length > 0 ? (
              <>
                <TableBody
                  stableSort={stableSort}
                  list={addressList}
                  getComparator={getComparator}
                  order={order}
                  orderBy={orderBy}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  isSelected={isSelected}
                  handleClick={handleClick}
                  emptyRows={emptyRows}
                  name="Address"
                />
                <TableFoot
                  list={addressList}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  getLabelDisplayedRowsTo={getLabelDisplayedRowsTo}
                  labelDisplayedRows={labelDisplayedRows}
                />
              </>
            ) : (
              <tbody>
                <tr>
                  <th scope="row" colSpan={12}>
                    <Typography level="h4" color="neutral">
                      No Address available
                    </Typography>
                  </th>
                </tr>
              </tbody>
            )}
          </Table>
        </Sheet>
        <MyModal
          open={open}
          setOpen={setOpen}
          tableHeading="Add Content Access for selected Addresses"
          placeholder="Select a content item"
          items={contentItems}
          handleAddItem={handleAddContentItemAccess}
          handleRemoveItem={handleRemoveContentItemAccess}
          setSelectedOption={setSelectedOption}
        />
        <MainModal
          open={openMain}
          setOpen={setOpenMain}
          tableHeading="Add an new Address"
          placeholder="Select a content item"
          items={contentItems}
          handleSubmit={handleSubmit}
          setSelectedOption={setSelectedOption}
          disable={disable}
          name="Address"
          setSelectedValues={setSelectedContents}
          selectedValues={selectedContents}
        />
      </Stack>
    </Box>
  );
};

export default AddressList;
