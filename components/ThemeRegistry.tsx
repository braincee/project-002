'use client'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssVarsProvider } from '@mui/joy/styles'
import GlobalStyles from '@mui/joy/GlobalStyles'
import CssBaseline from '@mui/joy/CssBaseline'
import { useState } from 'react'
import { usePathname, useServerInsertedHTML } from 'next/navigation'
import theme from '@/libs/theme'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import Header from '@/components/Header'

interface ThemeRegistryProps {
  options: any
  children: React.ReactNode
}

export default function ThemeRegistry(props: ThemeRegistryProps) {
  const { options, children } = props
  const pathname = usePathname()

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  if (pathname.includes('serve')) {
    // The ThirdWeb Provider has to wrap the component to be able to have access to useAddress
    // This is why it is still here
    // I could not find any other way to wrap it around the component.
    return (
      <ThirdwebProvider
        activeChain='ethereum'
        clientId='19086ab219f91521de7ac12f38c0a1f0'
      >
        {children}
      </ThirdwebProvider>
    )
  }

  return (
    <CacheProvider value={cache}>
      <CssVarsProvider
        defaultMode='system'
        theme={theme}
        modeStorageKey='mode-key'
        disableNestedContext
      >
        {/* the custom theme is optional */}
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: {
              overflowY: 'scroll',
            },
            a: {
              textDecoration: 'none',
              color: 'var(--joy-palette-primary-500)',
            },
            'a:hover': {
              color: 'var(--joy-palette-primary-600)',
            },
            'a:active': {
              color: 'var(--joy-palette-primary-700)',
            },
            li: {
              paddingLeft: '0 !important',
            },
          }}
        />
        <section className='flex flex-col min-h-screen w-full'>
          {pathname !== '/' && <Header />}
          {children}
        </section>
      </CssVarsProvider>
    </CacheProvider>
  )
}
