import { Box, Button, Input, Modal, ModalDialog, Option, Select, Typography } from "@mui/joy";

interface MyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  tableHeading: string;
  placeholder: string;
  items: any[];
  handleAddItem: () => void;
  handleRemoveItem: () => void;
  setSelectedOption: (value: string | null) => void;
}

const MyModal = (props: MyModalProps) => {
  const { open, setOpen, tableHeading, placeholder, items, handleAddItem, handleRemoveItem , setSelectedOption} = props;

  const handleChange = (event: any,
    newValue: string | null) => {
      setSelectedOption(newValue);
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}
      >
        <Typography id="nested-modal-title" level="h2" >
          {tableHeading}
          </Typography>
          {/* < Input placeholder={placeholder} /> */}
          <Select
            placeholder={placeholder}
            onChange={handleChange}
            defaultValue={placeholder}
            slotProps={{
              listbox: {
                sx: {
                  paddingX: 2,
                  maxHeight: 'fit-content',
                }
              },
            }}
          >
            { items.map((item) => (              
              <Option value={item.id} key={item.id}>{item.content ? item.content: item.address} </Option>
            ))}
          </Select>
          <Box
            sx={
              {
                mt: 1,
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row-reverse' },
              }
            }
          >
            <Button variant="solid" color="primary" onClick={() => handleAddItem()}>
              Add Access
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleRemoveItem()}
            >
              Remove Access
            </Button>
          </Box>
      </ModalDialog>
    </Modal>
  )
}
export default MyModal;