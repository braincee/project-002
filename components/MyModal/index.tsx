import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { useState } from "react";

interface MyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  tableHeading: string;
  placeholder: string;
  items: any[];
  handleAddItem: (value: any) => void;
  handleRemoveItem: (value: any) => void;
  setSelectedOption: (value: string | null) => void;
  loading: boolean;
}

const MyModal = (props: MyModalProps) => {
  const {
    open,
    setOpen,
    tableHeading,
    placeholder,
    items,
    handleAddItem,
    handleRemoveItem,
    setSelectedOption,
    loading,
  } = props;

  const [removeButtonClick, setRemoveButtonClick] = useState(false);
  const [addButtonClick, setAddButtonClick] = useState(false);

  const handleChange = (event: any, newValue: string | null) => {
    setSelectedOption(newValue);
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
          {items.map((item, index) => (
            <Option value={item.id} key={item.id}>
              <Typography sx={{ px: 2 }}>
                {index + 1}. {item.title ? item.title : item.address}{" "}
              </Typography>
            </Option>
          ))}
        </Select>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}
        >
          <Button
            variant="solid"
            color="primary"
            onClick={() => handleAddItem(setAddButtonClick)}
            loading={loading && addButtonClick ? true : false}
          >
            Add Access
          </Button>
          <Button
            variant="solid"
            color="danger"
            onClick={() => handleRemoveItem(setRemoveButtonClick)}
            loading={loading && removeButtonClick ? true : false}
          >
            Remove Access
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};
export default MyModal;
