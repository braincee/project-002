import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Box, Checkbox, Link } from '@mui/joy'
import { visuallyHidden } from '@mui/utils'

interface Data {
  id: string
  address?: string
  title?: string
  description?: string
  ContentAddresses?: any[]
  created_at: Date
  action?: any
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const HeadCells1: readonly HeadCell[] = [
  {
    id: 'address',
    numeric: false,
    disablePadding: true,
    label: 'Address',
  },
  {
    id: 'ContentAddresses',
    numeric: false,
    disablePadding: false,
    label: 'Content Access',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Date Created',
  },
]

const HeadCells2: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description',
  },
  {
    id: 'ContentAddresses',
    numeric: false,
    disablePadding: false,
    label: 'Address Access',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Date Created',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]

type Order = 'asc' | 'desc'

interface TableHeadProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  name: string
}

const TableHead = (props: TableHeadProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    name,
  } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <thead>
      <tr>
        <th style={{ zIndex: 20 }}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: {
                'aria-label': 'select all desserts',
              },
            }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
        {name &&
          name === 'Address' &&
          HeadCells1.map((headCell) => {
            const active = orderBy === headCell.id
            return (
              <th
                key={headCell.id}
                aria-sort={
                  active
                    ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                    : undefined
                }
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  underline='none'
                  color='neutral'
                  textColor={active ? 'primary.plainColor' : undefined}
                  component='button'
                  onClick={createSortHandler(headCell.id)}
                  fontWeight='lg'
                  startDecorator={
                    headCell.numeric ? (
                      <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                    ) : null
                  }
                  endDecorator={
                    !headCell.numeric ? (
                      <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                    ) : null
                  }
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        active && order === 'desc'
                          ? 'rotate(0deg)'
                          : 'rotate(180deg)',
                    },
                    '&:hover': { '& svg': { opacity: 1 } },
                  }}
                >
                  {headCell.label}
                  {active ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </Link>
              </th>
            )
          })}
        {name &&
          name === 'Content' &&
          HeadCells2.map((headCell) => {
            const active = orderBy === headCell.id
            return (
              <th
                key={headCell.id}
                aria-sort={
                  active
                    ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                    : undefined
                }
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  underline='none'
                  color='neutral'
                  textColor={active ? 'primary.plainColor' : undefined}
                  component='button'
                  onClick={createSortHandler(headCell.id)}
                  fontWeight='lg'
                  startDecorator={
                    headCell.numeric ? (
                      <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                    ) : null
                  }
                  endDecorator={
                    !headCell.numeric ? (
                      <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                    ) : null
                  }
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        active && order === 'desc'
                          ? 'rotate(0deg)'
                          : 'rotate(180deg)',
                    },
                    '&:hover': { '& svg': { opacity: 1 } },
                  }}
                >
                  {headCell.label}
                  {active ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </Link>
              </th>
            )
          })}
      </tr>
    </thead>
  )
}

export default TableHead
