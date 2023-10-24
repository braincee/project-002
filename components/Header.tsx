'use client'
import React, { useState } from 'react'
import {
  Typography,
  Box,
  Select,
  Option,
  Button,
  ButtonGroup,
  Link,
} from '@mui/joy'
import NextLink from 'next/link'
import ModeButton from './ModeButton'
import { usePathname, useRouter } from 'next/navigation'
import NextProgress from 'next-progress'
import { signOut as signOutNextAuth } from 'next-auth/react'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const signOut = async () => {
    setLoading(true)
    await signOutNextAuth()
    setLoading(false)
    router.push('/')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
      <NextProgress delay={100} options={{ showSpinner: false }} />
      <Select
        placeholder={
          pathname == '/'
            ? 'Home'
            : `${pathname.slice(1)[0].toUpperCase()}${pathname
                .slice(1)
                .slice(1)}`
        }
        slotProps={{
          listbox: {
            placement: 'top-start',
            sx: {
              maxHeight: 'fit-content',
              overflow: 'none',
            },
          },
        }}
      >
        <ButtonGroup
          spacing={1}
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
              justifyContent: 'space-between',
            },
            gap: 3,
            padding: 2,
          }}
          aria-label='spacing primary button group'
        >
          <ModeButton />
          <Button
            variant='outlined'
            onClick={signOut}
            loading={loading ? true : false}
          >
            Logout
          </Button>
        </ButtonGroup>
        <NextLink href='/dashboard'>
          <Link underline='none' sx={{ width: '100%', height: '100%', pb: 1 }}>
            <Option value='dashboard'>
              <Typography sx={{ paddingX: 2 }} level='h3'>
                Dashboard
              </Typography>
            </Option>
          </Link>
        </NextLink>
        <NextLink href='/audience'>
          <Link underline='none' sx={{ width: '100%', height: '100%', pb: 1 }}>
            <Option value='audience'>
              <Typography sx={{ paddingX: 2 }} level='h3'>
                Address List
              </Typography>
            </Option>
          </Link>
        </NextLink>
        <NextLink href='/content'>
          <Link underline='none' sx={{ width: '100%', height: '100%', pb: 1 }}>
            <Option value='content'>
              <Typography sx={{ paddingX: 2 }} level='h3'>
                Content List
              </Typography>
            </Option>
          </Link>
        </NextLink>
        <NextLink href='/logs'>
          <Link underline='none' sx={{ width: '100%', height: '100%', pb: 1 }}>
            <Option value='logs'>
              <Typography sx={{ paddingX: 2 }} level='h3'>
                Logs
              </Typography>
            </Option>
          </Link>
        </NextLink>
        <NextLink href='/manage'>
          <Link underline='none' sx={{ width: '100%', height: '100%', pb: 1 }}>
            <Option value='manage'>
              <Typography sx={{ paddingX: 2 }} level='h3'>
                Manage
              </Typography>
            </Option>
          </Link>
        </NextLink>
      </Select>
      <Typography sx={{ display: { xs: 'none', md: 'flex' } }} level='h3'>
        NFT GATED SERVER
      </Typography>
      <ButtonGroup
        spacing={1}
        sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}
        aria-label='spacing primary button group'
      >
        <ModeButton />
        <Button
          variant='outlined'
          onClick={signOut}
          loading={loading ? true : false}
        >
          Logout
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export default Header
