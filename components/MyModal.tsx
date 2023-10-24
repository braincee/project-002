import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import {
  Autocomplete,
  AutocompleteOption,
  Box,
  Button,
  ListItemDecorator,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy'
import { useEffect } from 'react'
import truncateEthAddress from 'truncate-eth-address'

interface MyModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  tableHeading: string
  placeholder: string
  items: any[]
  handleAddAccess: () => void
  handleRemoveAccess: () => void
  setSelectedOption: (value: string | null) => void
  loading: boolean
  selectedOption: string | null
  selected: string[]
}

const hasAccess = new Set()
let options: any = []

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
  } = props

  const handleChange = (event: any, newValue: any | null) => {
    setSelectedOption(newValue && newValue.id)
  }

  const handleAddOrRemove = () => {
    if (hasAccess.size > 0 && hasAccess.has(selectedOption)) {
      handleRemoveAccess()
    } else {
      handleAddAccess()
    }
  }

  useEffect(() => {
    items.map((item, index) => {
      let status = false
      let itemIds: string[] = []
      if (open) {
        if (item.title) {
          item.ContentAddresses.forEach((address: any) => {
            itemIds.push(address.address.id)
          })
        } else if (item.address) {
          item.ContentAddresses.forEach((content: any) => {
            itemIds.push(content.content.id)
          })
        }
        selected.forEach((value) => {
          if (itemIds.includes(value)) {
            hasAccess.add(item.id)
            status = true
            return
          }
        })
        options.push({
          label: item.title ? item.title : truncateEthAddress(item.address),
          id: item.id,
          index: index + 1,
          title: item.title || '',
          address: item.address || '',
          status: status,
        })
      } else {
        hasAccess.clear()
        options = []
      }
    })
  }, [open, hasAccess])

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby='nested-modal-title'
        aria-describedby='nested-modal-description'
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
        <Typography id='nested-modal-title' level='h2'>
          {tableHeading}
        </Typography>
        <Autocomplete
          onChange={handleChange}
          placeholder={placeholder}
          slotProps={{
            listbox: {
              sx: {
                maxHeight: '180px',
                overflow: 'auto',
              },
            },
          }}
          getOptionLabel={(option) => option.label}
          options={options}
          renderOption={(props, option) => (
            <AutocompleteOption {...props}>
              <ListItemDecorator key={option.id}>
                <Typography
                  sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {option.index}.{' '}
                  {option.title
                    ? option.title
                    : truncateEthAddress(option.address)}
                  {option.status && <CheckBoxOutlinedIcon color='primary' />}
                </Typography>
              </ListItemDecorator>
            </AutocompleteOption>
          )}
        />
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            gap: 1,
          }}
        >
          <Button
            variant='solid'
            color='primary'
            onClick={handleAddOrRemove}
            loading={loading}
            disabled={selectedOption === null ? true : false}
          >
            Save
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}
export default MyModal
