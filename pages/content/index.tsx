import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  ModalDialog,
  Radio,
  RadioGroup,
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
  getAddresses,
  getContentItems,
  getFilePublicURL,
  removeAddressIdContentIds,
  removeContent,
} from "@/libs/api";
import { Address, Content } from "@/libs/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import TableHead from "@/components/TableHead";
import MainModal from "@/components/MainModal";
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
    await Address.findAll({
      order: [["created_at", "DESC"]],
      include: { model: Content },
    })
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
  action?: any;
}

const ContentList = ({
  contentItems,
  addresses,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("Addresses");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openMain, setOpenMain] = useState(false);
  const [disable, setDisable] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [contentList, setContentList] = useState(contentItems);
  const [addressList, setAddressList] = useState(addresses);
  const [file, setFile] = useState<any>("");
  const [selectedAddresses, setSelectedAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [iconButtonId, setIconButtonId] = useState("");
  const [keepOrfans, setKeepOrfans] = useState<boolean | null>(null);

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  useEffect(() => {
    if (openMain === false) {
      setSelectedAddresses([]);
    }
  }, [openMain]);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    let urlString = "";
    if (event.target[1].type === "url") {
      urlString = event.target[1].value;
    }
    let title = event.target[2].value;
    let description = event.target[3].value;
    setDisable(true);
    event.target[1].value = "";
    event.target[2].value = "";
    event.target[3].value = "";

    const filename = await addFileToContentsStorage({ file, urlString });
    const {
      data: {
        response: {
          data: { publicUrl },
        },
      },
      contentId,
    } = await getFilePublicURL(filename);

    await addContent({ id: contentId, title, description, url: publicUrl });
    if (selectedAddresses.length > 0) {
      const addressIds = selectedAddresses.map((address) => address.id);
      await addContentIdAddressIds({ contentId, addressIds });
      const { response } = await getContentItems();
      setContentList(response);
      setDisable(false);
      setOpenMain(false);
      setFile("");
      setSelectedAddresses([]);
    } else {
      const { response } = await getContentItems();
      setContentList(response);
      setDisable(false);
      setOpenMain(false);
      setFile("");
    }
    setLoading(false);
  };

  const handleRemoveContent = async (id: string) => {
    setIconButtonId(id);
    setLoading(true);
    const keep_orfans = keepOrfans;
    await removeContent({ id, keep_orfans });
    const { response } = await getContentItems();
    setContentList(response);
    setIconButtonId("");
    setLoading(false);
    setKeepOrfans(null);
    setSelected([]);
    const allAddresses = await getAddresses();
    setAddressList(allAddresses.response);
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
    if (contentList.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? contentList.length
      : Math.min(contentList.length, (page + 1) * rowsPerPage);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contentList.length) : 0;

  const handleAddressAccess = () => {
    setOpen(true);
  };

  const handleAddContent = () => {
    setOpenMain(true);
  };

  const handleAddAddressAccess = async () => {
    setLoading(true);
    await addAddressIdContentIds({
      contentIds: selected,
      addressId: selectedOption,
    });
    const { response } = await getContentItems();
    setContentList(response);
    setSelected([]);
    setOpen(false);
    setLoading(false);
  };

  const handleRemoveAddressAccess = async () => {
    setLoading(true);
    await removeAddressIdContentIds({
      addressId: selectedOption,
      contentIds: selected,
    });
    const { response } = await getContentItems();
    setContentList(response);
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

  const handleKeepOrfans = (event: any) => {
    setKeepOrfans(event.target.value == "true");
    setTimeout(() => {
      setDeleteOpen(false);
    }, 1000);
  };

  return (
    <Box
      sx={{ px: { md: 4 }, display: "flex", flexDirection: "column", gap: 2 }}
    >
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
                width: "40px",
              },
              "& thead th:nth-child(2)": {
                width: { md: "25%" },
              },
              "& thead th:nth-child(3)": {
                width: { md: "25%" },
              },
              "& thead th:nth-child(4)": {
                width: { md: "20%" },
              },
              "& thead th:nth-child(5)": {
                width: { md: "20%" },
              },

              "& tr > *:nth-child(n+4)": { textAlign: "center" },
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
              rowCount={contentList.length}
              name="Content"
            />
            {contentList.length > 0 ? (
              <>
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
                  name="Content"
                  handleRemove={handleRemoveContent}
                  loading={loading}
                  iconButtonId={iconButtonId}
                  deleteOpen={deleteOpen}
                  setDeleteOpen={setDeleteOpen}
                  keepOrfans={keepOrfans}
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
              </>
            ) : (
              <tbody>
                <tr>
                  <th scope="row" colSpan={12}>
                    <Typography level="h4" color="neutral">
                      No Content available
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
          tableHeading="Add / Remove Address Access for selected Content items"
          placeholder="Select an address"
          items={addressList}
          handleAddAccess={handleAddAddressAccess}
          handleRemoveAccess={handleRemoveAddressAccess}
          setSelectedOption={setSelectedOption}
          loading={loading}
          selectedOption={selectedOption}
          selected={selected}
        />
        <MainModal
          open={openMain}
          setOpen={setOpenMain}
          tableHeading="Add New Content Item"
          placeholder="Select an address"
          items={addressList}
          handleSubmit={handleSubmit}
          setSelectedOption={setSelectedOption}
          disable={disable}
          name="Content"
          setFile={setFile}
          setSelectedValues={setSelectedAddresses}
          selectedValues={selectedAddresses}
          loading={loading}
        />
        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <ModalDialog
            aria-labelledby="nested-modal-title"
            aria-describedby="nested-modal-description"
            sx={(theme) => ({
              [theme.breakpoints.only("xs")]: {
                top: "unset",
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                transform: "none",
                maxWidth: "unset",
                paddingY: 3,
              },
            })}
          >
            {" "}
            <Typography
              id="nested-modal-title"
              level="h2"
              sx={{ mb: { xs: 2 } }}
            >
              Keep / Delete Address(es)
            </Typography>
            <RadioGroup
              orientation="horizontal"
              name="keep_orfans"
              onChange={handleKeepOrfans}
            >
              <Radio value="true" label="Keep" variant="outlined" size="lg" />
              <Radio
                value="false"
                label="Delete"
                variant="outlined"
                size="lg"
              />
            </RadioGroup>
          </ModalDialog>
        </Modal>
      </Stack>
    </Box>
  );
};

export default ContentList;
