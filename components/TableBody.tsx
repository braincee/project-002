'use client'
import { Delete } from '@mui/icons-material'
import { Checkbox, CircularProgress, IconButton } from '@mui/joy'
import { useEffect, useState } from 'react'
import truncateEthAddress from 'truncate-eth-address'

interface TableBodyProps {
  stableSort: (value1: any[], value2: any) => any[]
  list: any[]
  getComparator: (value1: any, value2: any) => void
  order: any
  orderBy: string
  page: number
  rowsPerPage: number
  isSelected: (value: string) => boolean
  handleClick: (value1: React.MouseEvent<unknown>, value2: string) => void
  emptyRows: number
  name: string
  handleRemove: (value: string) => void
  iconButtonId?: string
  loading?: boolean
  deleteOpen?: boolean
  setDeleteOpen?: (value: boolean) => void
  keepOrfans?: boolean | null
}

const TableBody = (props: TableBodyProps) => {
  const {
    stableSort,
    list,
    getComparator,
    order,
    orderBy,
    page,
    rowsPerPage,
    isSelected,
    handleClick,
    emptyRows,
    name,
    handleRemove,
    iconButtonId,
    loading,
    deleteOpen,
    setDeleteOpen,
    keepOrfans,
  } = props

  const [removeId, setRemoveId] = useState<string>('')

  const setOrfanValue = (id: string) => {
    if (name === 'Content') {
      setDeleteOpen?.(true)
      setRemoveId(id)
    }
  }

  useEffect(() => {
    if (keepOrfans !== null) {
      handleRemove(removeId)
    }
  }, [keepOrfans])

  return (
    <tbody>
      {stableSort(list, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item: any, index) => {
          const isItemSelected = isSelected(item.id)
          const labelId = `enhanced-table-checkbox-${index}`
          return (
            <tr
              onClick={(event) => handleClick(event, item.id.toString())}
              role='checkbox'
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={item && item.id}
              style={
                isItemSelected
                  ? ({
                      '--TableCell-dataBackground':
                        'var(--TableCell-selectedBackground)',
                      '--TableCell-headBackground':
                        'var(--TableCell-selectedBackground)',
                    } as React.CSSProperties)
                  : {}
              }
            >
              <th scope='row'>
                <Checkbox
                  checked={isItemSelected}
                  slotProps={{
                    input: {
                      'aria-labelledby': labelId,
                    },
                  }}
                  sx={{ verticalAlign: 'top' }}
                />
              </th>
              {name && name === 'Content' ? (
                <>
                  <th id={labelId} scope='row'>
                    {item.title}
                  </th>
                  <td>{item.description}</td>
                  <td>
                    {item.ContentAddresses && item.ContentAddresses.length}
                  </td>
                  <td>{new Date(item.createdAt).toDateString()}</td>
                  <td>
                    <IconButton
                      onClick={() => setOrfanValue(item.id)}
                      disabled={loading}
                    >
                      {iconButtonId === item.id ? (
                        <CircularProgress size='sm' variant='plain' />
                      ) : (
                        <Delete />
                      )}
                    </IconButton>
                  </td>
                </>
              ) : (
                <>
                  <th id={labelId} scope='row'>
                    {truncateEthAddress(item.address)}
                  </th>
                  <td>{item.ContentAddresses.length}</td>
                  <td>{new Date(item.createdAt).toDateString()}</td>
                </>
              )}
            </tr>
          )
        })}
      {emptyRows > 0 && (
        <tr
          style={
            {
              height: `calc(${emptyRows} * 40px)`,
              '--TableRow-hoverBackground': 'transparent',
            } as React.CSSProperties
          }
        >
          <td colSpan={6} />
        </tr>
      )}
    </tbody>
  )
}

export default TableBody
