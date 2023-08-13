import { Box, Sheet, Stack, Table, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import TableToolbar from "@/components/TableToolbar";
import MyModal from "@/components/MyModal";
import {
  addAddress,
  addAddressIdContentIds,
  addContentIdAddressIds,
  getAddresses,
  removeContentIdAddressIds,
} from "@/libs/api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Address, Content } from "@/libs/models";
import TableHead from "@/components/TableHead";
import MainModal from "@/components/MainModal";
import TableBody from "@/components/TableBody";
import TableFoot from "@/components/TableFoot";
import { v4 as uuidV4 } from "uuid";

export const getServerSideProps: GetServerSideProps = async () => {
  const addresses = JSON.stringify(
    await Address.findAll({
      order: [["created_at", "DESC"]],
      include: { model: Content },
    })
  );
  const contentItems = JSON.stringify(
    await Content.findAll({
      order: [["created_at", "DESC"]],
      include: { model: Address },
    })
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
  action?: any;
}

const AddressList = ({
  addresses,
  contentItems,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selected, setSelected] = useState<string[]>([]);
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
  const [loading, setLoading] = useState(false);

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  useEffect(() => {
    if (openMain === false) {
      setSelectedContents([]);
    }
  }, [openMain]);

  const handleSubmit = async (event: any) => {
    let inputValue = event.target[0].value;
    setDisable(true);
    setLoading(true);
    event.target[0].value = "";
    const addressId = uuidV4();
    await addAddress({ id: addressId, address: inputValue });
    if (selectedContents.length > 0) {
      const contentIds = selectedContents.map((content) => content.id);
      await addAddressIdContentIds({ addressId, contentIds });
      const { response } = await getAddresses();
      setAddressList(response);
      setDisable(false);
      setOpenMain(false);
      setSelectedContents([]);
    } else {
      const { response } = await getAddresses();
      setAddressList(response);
      setOpenMain(false);
      setDisable(false);
    }
    setLoading(false);
  };

  const handleRemoveAddress = (id: string) => {};

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
    let newSelected: string[] = [];

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

  const handleAddContentItemAccess = async () => {
    setLoading(true);
    await addContentIdAddressIds({
      addressIds: selected,
      contentId: selectedOption,
    });
    const { response } = await getAddresses();
    setAddressList(response);
    setSelected([]);
    setOpen(false);
    setLoading(false);
  };

  const handleRemoveContentItemAccess = async () => {
    setLoading(true);
    await removeContentIdAddressIds({
      addressIds: selected,
      contentId: selectedOption,
    });
    const { response } = await getAddresses();
    setAddressList(response);
    setSelected([]);
    setOpen(false);
    setLoading(false);
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
    <Box
      sx={{
        px: { md: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
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
              width: "40px",
            },
            "& thead th:nth-child(2)": {
              width: "55%",
            },
            "& thead th:nth-child(3)": {
              width: "20%",
            },
            "& thead th:nth-child(4)": {
              width: "21%",
            },
            "& tr > *:nth-child(n+3)": { textAlign: "center" },
            "& tr > *:first-child": {
              position: "sticky",
              left: 0,
            },
            "& tr > *:last-child": {
              position: "sticky",
              right: 0,
            },
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
                handleRemove={handleRemoveAddress}
                loading={loading}
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
        handleAddAccess={handleAddContentItemAccess}
        handleRemoveAccess={handleRemoveContentItemAccess}
        setSelectedOption={setSelectedOption}
        loading={loading}
        selectedOption={selectedOption}
        selected={selected}
      />
      <MainModal
        open={openMain}
        setOpen={setOpenMain}
        tableHeading="Add New Address"
        placeholder="Select a content item"
        items={contentItems}
        handleSubmit={handleSubmit}
        setSelectedOption={setSelectedOption}
        disable={disable}
        name="Address"
        setSelectedValues={setSelectedContents}
        selectedValues={selectedContents}
        loading={loading}
      />
    </Box>
  );
};

export default AddressList;
