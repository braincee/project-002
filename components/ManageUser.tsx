'use client'
import React, { useState } from 'react'
import {
  Box,
  Input,
  Button,
  Typography,
  Table,
  Sheet,
  Modal,
  ModalDialog,
  Stack,
} from '@mui/joy'
import Add from '@mui/icons-material/Add'
import { addUser, getUsers } from '@/libs/api'

interface Data {
  id: string
  email: string
  password: string
}

const ManageUser = ({ users }: { users: any[] }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userList, setUserList] = useState<any[]>(users || [])
  const [newUserEmail, setNewUserEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAddUser = async () => {
    if (newUserEmail) {
      setLoading(true)
      await addUser({ email: newUserEmail, password: password })
      const { response } = await getUsers()
      setUserList(response)
      setLoading(false)
      setNewUserEmail('')
      setOpen(false)
    }
  }

  return (
    <Box
      sx={{ py: 2, px: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box sx={{ p: 2, border: '1px solid #ccc' }}>
        {/* Content for the first box */}
        <Typography level='h4' sx={{ marginBottom: 2 }}>
          Email Address: test@test.com
        </Typography>
        <Input
          placeholder='Enter new password'
          type='password'
          value=''
          sx={{
            width: '100%',
            '@media (min-width: 768px)': {
              width: '300px',
            },
          }}
        />
        <Button variant='outlined' sx={{ marginTop: 2 }}>
          Change Password
        </Button>
      </Box>
      <Box sx={{ p: 2, border: '1px solid #ccc' }}>
        <Button
          variant='outlined'
          color='neutral'
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
          sx={{ display: 'flex', mb: 1 }}
        >
          Add User
        </Button>
        <Sheet sx={{ height: 300, overflow: 'auto' }}>
          <Table
            aria-label='stripe table'
            stripe='even'
            stickyHeader
            hoverRow
            sx={{
              '--TableCell-headBackground': 'transparent',
              '--TableCell-selectedBackground': (theme) =>
                theme.vars.palette.primary.softBg,
              '& thead th:nth-child(1)': {
                width: '40px',
              },
              '& thead th:nth-child(2)': {
                width: '20%',
              },
              '& tr > *:nth-child(n+2)': { textAlign: 'right' },
            }}
          >
            <thead>
              <tr>
                <th>USERS</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user: Data) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>
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
              minWidth: '500px',
            },
          })}
        >
          <Typography id='nested-modal-title' level='h2'>
            Add New Entries
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleAddUser()
            }}
            method='POST'
          >
            <Stack spacing={2} direction={{ xs: 'column' }}>
              <Input
                placeholder='Add user email'
                type='email'
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <Input
                placeholder='Add user password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row-reverse' },
              }}
            >
              <Button
                type='submit'
                variant='solid'
                color='primary'
                loading={loading}
              >
                Save
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </Box>
  )
}

export default ManageUser
