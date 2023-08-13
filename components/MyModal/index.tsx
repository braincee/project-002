import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import truncateEthAddress from "truncate-eth-address";

interface MyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  tableHeading: string;
  placeholder: string;
  items: any[];
  handleAddAccess: () => void;
  handleRemoveAccess: () => void;
  setSelectedOption: (value: string | null) => void;
  loading: boolean;
  selectedOption: string | null;
  selected: string[];
}

const hasAccess = new Set();

const MyModal = (props: MyModalProps) => {
  const {
    open,
    setOpen,
    tableHeading,
    placeholder,
    items,
    handleAddAccess,
    handleRemoveAccess,
    setSelectedOption,
    loading,
    selectedOption,
    selected,
  } = props;

  const handleChange = (event: any, newValue: string | null) => {
    setSelectedOption(newValue);
  };
  console.log(selectedOption, hasAccess);

  const handleAddOrRemove = () => {
    if (hasAccess.size > 0 && hasAccess.has(selectedOption)) {
      handleRemoveAccess();
    } else {
      handleAddAccess();
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
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
          },
        })}
      >
        <Typography id="nested-modal-title" level="h2">
          {tableHeading}
        </Typography>
        <Select
          placeholder={placeholder}
          onChange={handleChange}
          defaultValue={placeholder}
          slotProps={{
            listbox: {
              sx: {
                maxHeight: "180px",
                overflow: "auto",
              },
            },
          }}
        >
          {items.map((item, index) => {
            let status = false;
            let itemIds: string[] = [];
            if (open) {
              if (item.title) {
                item.Addresses.forEach((address: any) => {
                  itemIds.push(address.id);
                  console.log("test");
                });
              } else if (item.address) {
                item.Contents.forEach((content: any) => {
                  itemIds.push(content.id);
                });
              }
              selected.forEach((value) => {
                if (itemIds.includes(value)) {
                  hasAccess.add(item.id);
                  status = true;
                  return;
                }
              });
            }
            return (
              <Option value={item.id} key={item.id}>
                <Typography
                  sx={{ px: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  {index + 1}.{" "}
                  {item.title ? item.title : truncateEthAddress(item.address)}
                  {status && <CheckBoxOutlinedIcon color="primary" />}
                </Typography>
              </Option>
            );
          })}
        </Select>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            variant="solid"
            color="primary"
            onClick={handleAddOrRemove}
            loading={loading}
            disabled={selectedOption === null ? true : false}
          >
            Save
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};
export default MyModal;
