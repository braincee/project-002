'use client'
import React, { ReactElement, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Sheet,
  Stack,
  Table,
  Tooltip,
  Typography,
} from '@mui/joy'
import { Download } from '@mui/icons-material'
import { ExportToCsv } from 'export-to-csv'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const users = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@mail.com',
  },
  {
    id: 2,
    name: 'User 2',
    email: 'user2@mail.com',
  },
]

const Log = ({ logs }: any) => {
  const [selected, setSelected] = useState<readonly string[]>([])
  const [alert, setAlert] = useState<ReactElement<any> | string>('')

  const isSelected = (index: string) => selected.indexOf(index) !== -1

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = [].map((log: any) => log.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, index: string) => {
    const selectedIndex = selected.indexOf(index)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleDownload = () => {
    const data: any[] = []
    logs.forEach((log: any, index: number) => {
      data.push({
        user: [(users[index] && users[index].name) || users[0].name],
        'request time': `${new Date(log.log).toDateString()} ${new Date(log.log)
          .toTimeString()
          .substring(0, 12)}` as any,
      })
    })

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: false,
      showTitle: true,
      title: 'Logs Table',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: ['User', 'Request time'],
    }

    const csvExporter = new ExportToCsv(options)
    if (data.length > 0) {
      csvExporter.generateCsv(data)
    } else {
      setAlert(
        <Alert variant='outlined' color='danger'>
          Table has no data
        </Alert>
      )
      setTimeout(() => {
        setAlert('')
      }, 3000)
    }
  }

  return (
    <Box
      sx={{
        py: 2,
        px: { md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography level='h3'>Logs</Typography>
      <Stack spacing={2}>
        {alert}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 1,
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: 'background.level1',
            }),
            borderTopLeftRadius: 'var(--unstable_actionRadius)',
            borderTopRightRadius: 'var(--unstable_actionRadius)',
          }}
        >
          <Stack spacing={1} direction={{ xs: 'column', md: 'row' }}>
            <Tooltip
              title='Download as CSV'
              sx={{ display: 'flex', justifyItems: 'center' }}
            >
              <Button
                startDecorator={<Download />}
                size='sm'
                color='neutral'
                variant='solid'
                onClick={() => handleDownload()}
              >
                Download
              </Button>
            </Tooltip>
          </Stack>
        </Box>
        <Sheet
          variant='outlined'
          sx={{
            width: '100%',
            boxShadow: 'sm',
            borderRadius: 'sm',
            // background needs to have transparency to show the scrolling shadows
            '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
            '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
            background: (
              theme
            ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
          linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
          radial-gradient(
            farthest-side at 0 50%,
            rgba(0, 0, 0, 0.12),
            rgba(0, 0, 0, 0)
          ),
          radial-gradient(
              farthest-side at 100% 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            )
            0 100%`,
            backgroundSize:
              '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'local, local, scroll, scroll',
            backgroundPosition:
              'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
            backgroundColor: 'background.surface',
          }}
        >
          <Table
            aria-label='stripe table'
            stripe='even'
            hoverRow
            sx={{
              '--TableCell-headBackground': 'transparent',
              '--TableCell-selectedBackground': (theme) =>
                theme.vars.palette.primary.softBg,
              '& thead th:nth-child(1)': {
                width: '50%',
              },
              '& thead th:nth-child(2)': {
                width: '50%',
              },
            }}
          >
            <thead>
              <tr>
                <th>User</th>
                <th>Request time</th>
              </tr>
            </thead>
            {logs.length > 0 ? (
              <tbody>
                {logs.map((log: any, index: number) => {
                  const isItemSelected = isSelected(log.id)
                  return (
                    <tr
                      key={index}
                      onClick={(event) => handleClick(event, log.id)}
                      role='checkbox'
                      tabIndex={-1}
                      aria-checked={isItemSelected}
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
                      <td>
                        <Typography>
                          {(users[index] && users[index].name) || users[0].name}
                        </Typography>
                      </td>
                      <td>
                        {new Date(log.log).toDateString()} @{' '}
                        {new Date(log.log).toTimeString().substring(0, 12)}
                      </td>
                    </tr>
                  )
                })}
                <tr></tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <th scope='row' colSpan={12}>
                    <Typography level='h4' color='neutral'>
                      No Address available
                    </Typography>
                  </th>
                </tr>
              </tbody>
            )}
          </Table>
        </Sheet>
      </Stack>
    </Box>
  )
}

export default Log
