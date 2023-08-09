import {
  Box,
  Button,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Stack,
  Switch,
  Textarea,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import DragDrop from "@/components/DragDrop";

interface MyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  tableHeading: string;
  placeholder: string;
  disable: boolean;
  name: String;
  items: any[];
  handleSubmit: (event: React.FormEvent) => void;
  setSelectedOption: (value: string | null) => void;
  setFile?: (value: any) => void;
  setSelectedValues?: (value: any) => void;
  selectedValues?: any[];
}

const MainModal = (props: MyModalProps) => {
  const {
    open,
    setOpen,
    tableHeading,
    placeholder,
    items,
    handleSubmit,
    setSelectedOption,
    disable,
    name,
    setFile,
    setSelectedValues,
    selectedValues,
  } = props;

  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: any, newValue: string | null) => {
    setSelectedOption(newValue);
    if (newValue !== null) {
      setSelectedValues?.((prev: any) => [...prev, newValue]);
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
        {name && name === "Content" && (
          <Stack spacing={2} direction="row" sx={{ width: "100%", my: 2 }}>
            <Typography>Toggle to add URL Instead</Typography>
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </Stack>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
          style={{ minWidth: "500px" }}
          method="POST"
        >
          <Stack spacing={2} direction={{ xs: "column" }}>
            {name === "Content" ? (
              <>
                {!checked ? (
                  <DragDrop setFile={setFile} />
                ) : (
                  <Input
                    placeholder="Add URL"
                    type="url"
                    required
                    sx={{ width: { xs: "100%" } }}
                  />
                )}
                <Input
                  required
                  placeholder="Add title"
                  sx={{ width: { xs: "100%" } }}
                />
                <Textarea
                  required
                  minRows={2}
                  placeholder="Add description"
                  sx={{ width: { xs: "100%" } }}
                />
              </>
            ) : (
              <Input
                required
                placeholder="Add an address"
                sx={{ width: { xs: "100%" } }}
              />
            )}
            <Select
              placeholder={placeholder}
              onChange={handleChange}
              defaultValue={placeholder}
              slotProps={{
                listbox: {
                  sx: {
                    paddingX: 2,
                    maxHeight: "fit-content",
                  },
                },
              }}
            >
              {items.map((item) => (
                <Option value={item} key={item.id}>
                  {item.title ? item.title : item.address}{" "}
                </Option>
              ))}
            </Select>
            <Stack
              spacing={1}
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {selectedValues &&
                selectedValues?.length > 0 &&
                selectedValues?.map((value: any) => {
                  return (
                    <Typography
                      sx={{
                        border: "1px solid #CDD7E1",
                        width: "fit-content",
                        px: "4px",
                        borderRadius: "5px",
                      }}
                    >
                      {value.address}
                    </Typography>
                  );
                })}
            </Stack>
            <Button type="submit" disabled={disable}>
              Add Item
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
export default MainModal;