import {
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
} from '@mui/joy'
import { useState } from 'react'
import DragDrop from '@/components/DragDrop'
import truncateEthAddress from 'truncate-eth-address'

interface MainModalProps {
  open: boolean
  setOpen: (value: boolean) => void
  tableHeading: string
  placeholder: string
  disable: boolean
  name: string
  items: any[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setSelectedOption: (value: string | null) => void
  setSelectedValues?: (value: any) => void
  selectedValues?: any[]
  loading: boolean
}

const MainModal = (props: MainModalProps) => {
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
    setSelectedValues,
    selectedValues,
    loading,
  } = props

  const [checked, setChecked] = useState<boolean>(false)

  const handleChange = (event: any, newValue: string | null) => {
    setSelectedOption(newValue)
    if (newValue !== null) {
      setSelectedValues?.((prev: any) => {
        const set = new Set(prev)
        const set2 = new Set(prev)
        set2.add(newValue)
        if (set2.size > set.size) {
          return [...prev, newValue]
        }
        return [...prev]
      })
    }
  }

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
          [theme.breakpoints.not('xs')]: {
            maxHeight: '98%',
            overflow: 'auto',
            minWidth: '500px',
          },
        })}
      >
        <Typography id='nested-modal-title' level='h2'>
          {tableHeading}
        </Typography>
        {name && name === 'Content' && (
          <Stack spacing={2} direction='row' sx={{ width: '100%', my: 2 }}>
            <Typography>Toggle to add URL Instead</Typography>
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          </Stack>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(event)
          }}
          method='POST'
        >
          <Stack spacing={2} direction={{ xs: 'column' }}>
            {name === 'Content' ? (
              <>
                <DragDrop checked={checked} />
                <Input
                  placeholder='Add URL'
                  type='url'
                  name='url'
                  required={checked ? true : false}
                  sx={{
                    width: {
                      xs: '100%',
                    },
                    display: checked ? 'flex' : 'none',
                  }}
                />
                <Input
                  required
                  placeholder='Add title'
                  name='title'
                  sx={{
                    width: { xs: '100%' },
                  }}
                />
                <Textarea
                  required
                  name='description'
                  minRows={2}
                  placeholder='Add description'
                  sx={{ width: { xs: '100%' } }}
                />
              </>
            ) : (
              <Input
                required
                placeholder='Add an address'
                name='address'
                sx={{ width: { xs: '100%' } }}
              />
            )}
            <Select
              placeholder={placeholder}
              onChange={handleChange}
              defaultValue={placeholder}
              slotProps={{
                listbox: {
                  sx: {
                    maxHeight: '220px',
                    overflow: 'auto',
                  },
                },
              }}
            >
              {items.map((item, index) => (
                <Option value={item} key={item.id}>
                  <Typography sx={{ px: 2 }}>
                    {index + 1}.{' '}
                    {item.title ? item.title : truncateEthAddress(item.address)}
                  </Typography>
                </Option>
              ))}
            </Select>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 1,
                alignItems: 'center',
              }}
            >
              {selectedValues &&
                selectedValues?.length > 0 &&
                selectedValues?.map((value: any) => {
                  return (
                    <Typography
                      sx={{
                        border: '1px solid #CDD7E1',
                        width: 'fit-content',
                        px: '4px',
                        borderRadius: '5px',
                      }}
                      key={value.id}
                    >
                      {value.address
                        ? truncateEthAddress(value.address)
                        : value.title}
                    </Typography>
                  )
                })}
            </Stack>
            <Button
              type='submit'
              disabled={disable}
              loading={loading ? true : false}
            >
              Add Item
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}
export default MainModal
