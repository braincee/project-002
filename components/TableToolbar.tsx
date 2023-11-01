import { Add, Remove } from '@mui/icons-material'
import { Box, Button, Tooltip, Typography } from '@mui/joy'

interface TableToolbarProps {
  numSelected: number
  handleAccess: () => void
  handleAdd: () => void
  buttonName: string
  tableHeader: string
}

const TableToolbar = (props: TableToolbarProps) => {
  const { numSelected, handleAccess, handleAdd, buttonName, tableHeader } =
    props

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        px: 2,
        ...(numSelected > 0 && {
          bgcolor: 'background.level1',
        }),
        borderTopLeftRadius: 'var(--unstable_actionRadius)',
        borderTopRightRadius: 'var(--unstable_actionRadius)',
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          level='h4'
          sx={{ flex: '1 1 100%' }}
          id='tableTitle'
          component='div'
        >
          {tableHeader}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Add / Remove'>
          <Button
            startDecorator={
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
              >
                <Add />/<Remove />
              </div>
            }
            size='sm'
            color='neutral'
            variant='solid'
            onClick={() => handleAccess()}
            sx={{ minWidth: 'fit-content' }}
          >
            {buttonName}
          </Button>
        </Tooltip>
      ) : (
        <Button
          size='sm'
          color='primary'
          variant='solid'
          onClick={() => handleAdd()}
          sx={{ minWidth: 'fit-content' }}
        >
          {buttonName === 'Address' ? 'Add Content' : 'Add Address'}
        </Button>
      )}
    </Box>
  )
}

export default TableToolbar
