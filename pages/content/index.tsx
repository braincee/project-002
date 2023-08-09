import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Sheet,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import TableToolbar from "@/components/TableToolbar";
import MyModal from "@/components/MyModal";
import {
  addAddressIdContentIds,
  addContent,
  addContentIdAddressIds,
  addFileToContentsStorage,
  getContentItems,
  getFilePublicURL,
} from "@/libs/api";
import { Address, Content } from "@/libs/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import TableHead from "@/components/TableHead";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material";
import MainModal from "@/components/MainModal";
import { v4 as uuidV4 } from "uuid";
import TableBody from "@/components/TableBody";
import TableFoot from "@/components/TableFoot";

export const getServerSideProps: GetServerSideProps = async () => {
  const contentItems = JSON.stringify(
    await Content.findAll({
      order: [["created_at", "DESC"]],
      include: { model: Address },
    })
  );
  const addresses = JSON.stringify(
    await Address.findAll({ order: [["created_at", "DESC"]] })
  );

  return {
    props: {
      contentItems: JSON.parse(contentItems),
      addresses: JSON.parse(addresses),
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

const ContentList = ({
  contentItems,
  addresses,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("Addresses");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openMain, setOpenMain] = useState(false);
  const [disable, setDisable] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [contentList, setContentList] = useState(contentItems);
  const [file, setFile] = useState<any>("");
  const [selectedAddresses, setSelectedAddresses] = useState<any[]>([]);

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  const handleSubmit = async (event: any) => {
    let urlString = "";
    if (event.target[0].type === "text") {
      urlString = event.target[0].value;
    }

    let title = event.target[1].value;
    let description = event.target[2].value;

    setDisable(true);
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
    if (file) {
      const filename = await addFileToContentsStorage(file);
      const { url, contentId } = await getFilePublicURL(filename);
      addContent({ id: contentId, title, description, url }).then(() => {
        if (selectedAddresses.length > 0) {
          const addressIds = selectedAddresses.map((address) => address.id);
          addContentIdAddressIds({
            contentId,
            addressIds,
          }).then(() => {
            getContentItems().then((res) => {
              setContentList(res.response);
              setDisable(false);
              setOpenMain(false);
              setFile("");
            });
          });
        } else {
          getContentItems().then((res) => {
            setContentList(res.response);
            setDisable(false);
            setOpenMain(false);
            setFile("");
          });
        }
      });
    } else {
      const contentId = uuidV4();
      addContent({ id: contentId, title, description, urlString }).then(() => {
        if (selectedAddresses.length > 0) {
          const addressIds = selectedAddresses.map((address) => address.id);
          addContentIdAddressIds({
            contentId,
            addressIds,
          });
        }
        getContentItems().then((res) => {
          setContentList(res.response);
          console.log(res.response);
          setDisable(false);
          setOpenMain(false);
          setFile("");
        });
      });
    }
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
    if (contentList.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? contentList.length
      : Math.min(contentList.length, (page + 1) * rowsPerPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contentList.length) : 0;

  const handleAddressAccess = () => {
    setOpen(true);
  };
  const handleAddContent = () => {
    setOpenMain(true);
  };

  const handleAddAddressAccess = () => {
    addAddressIdContentIds({
      contentIds: selected,
      addressId: selectedOption,
    }).then(() => {
      getContentItems().then((res) => {
        setContentList(res.response);
        setSelected([]);
        setOpen(false);
      });
    });
  };

  const handleRemoveAddressAccess = () => {};

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
      <Stack spacing={1}>
        <Sheet
          variant="outlined"
          sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}
        >
          <TableToolbar
            numSelected={selected.length}
            handleAccess={handleAddressAccess}
            handleAdd={handleAddContent}
            buttonName={"Address"}
            tableHeader={"Content List"}
          />
          <Table
            aria-label="stripe table"
            stripe="even"
            stickyHeader
            hoverRow
            sx={{
              "--TableCell-headBackground": "transparent",
              "--TableCell-selectedBackground": (theme) =>
                theme.vars.palette.primary.softBg,
              "& thead th:nth-child(1)": {
                width: "5%",
              },
              "& thead th:nth-child(2)": {
                width: "25%",
              },
              "& thead th:nth-child(3)": {
                width: "30%",
              },
              "& thead th:nth-child(4)": {
                width: "20%",
              },
              "& thead th:nth-child(5)": {
                width: "20%",
              },
              "& tr > *:nth-child(n+4)": { textAlign: "center" },
            }}
          >
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={contentList.length}
              name="Content"
            />
            <TableBody
              stableSort={stableSort}
              list={contentList}
              getComparator={getComparator}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              isSelected={isSelected}
              handleClick={handleClick}
              emptyRows={emptyRows}
            />
            <TableFoot
              list={contentList}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              getLabelDisplayedRowsTo={getLabelDisplayedRowsTo}
              labelDisplayedRows={labelDisplayedRows}
            />
          </Table>
        </Sheet>
        <MyModal
          open={open}
          setOpen={setOpen}
          tableHeading="Add / Remove Address Access for selected Content items"
          placeholder="Select an address"
          items={addresses}
          handleAddItem={handleAddAddressAccess}
          handleRemoveItem={handleRemoveAddressAccess}
          setSelectedOption={setSelectedOption}
        />
        <MainModal
          open={openMain}
          setOpen={setOpenMain}
          tableHeading="Add an new Content Item"
          placeholder="Select an address"
          items={addresses}
          handleSubmit={handleSubmit}
          setSelectedOption={setSelectedOption}
          disable={disable}
          name="Content"
          setFile={setFile}
          setSelectedValues={setSelectedAddresses}
          selectedValues={selectedAddresses}
        />
      </Stack>
    </Box>
  );
};

export default ContentList;
