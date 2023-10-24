import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Option,
  Select,
  Typography,
} from '@mui/joy'
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material'

interface TableFootProps {
  list: any[]
  page: number
  rowsPerPage: number
  handleChangeRowsPerPage: (event: any, newValue: number | null) => void
  labelDisplayedRows: ({
    from,
    to,
    count,
  }: {
    from: number
    to: number
    count: number
  }) => string
  handleChangePage: (value: number) => void
  getLabelDisplayedRowsTo: () => any
}
const TableFoot = (props: TableFootProps) => {
  const {
    list,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    labelDisplayedRows,
    handleChangePage,
    getLabelDisplayedRowsTo,
  } = props
  return (
    <tfoot>
      <tr>
        <td colSpan={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >
            <FormControl orientation='horizontal' size='sm'>
              <FormLabel>Rows per page:</FormLabel>
              <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
              </Select>
            </FormControl>
            <Typography textAlign='center' sx={{ minWidth: 80 }}>
              {labelDisplayedRows({
                from: list.length === 0 ? 0 : page * rowsPerPage + 1,
                to: getLabelDisplayedRowsTo(),
                count: list.length === -1 ? -1 : list.length,
              })}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size='sm'
                color='neutral'
                variant='outlined'
                disabled={page === 0}
                onClick={() => handleChangePage(page - 1)}
                sx={{ bgcolor: 'background.surface' }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton
                size='sm'
                color='neutral'
                variant='outlined'
                disabled={
                  list.length !== -1
                    ? page >= Math.ceil(list.length / rowsPerPage) - 1
                    : false
                }
                onClick={() => handleChangePage(page + 1)}
                sx={{ bgcolor: 'background.surface' }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </Box>
        </td>
      </tr>
    </tfoot>
  )
}

export default TableFoot
