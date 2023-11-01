'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ConnectWallet, useAddress, useSDK } from '@thirdweb-dev/react'
import { useParams } from 'next/navigation'
import Loader from '@/components/Loader'
interface myContentProps {
  id: string
  title: string
  description: string
  url: string
  fileType: string
  createdAt: Date | null
  updatedAt: Date | null
  ContentAddresses: any[]
}

const ServeContent = ({ content }: { content: myContentProps }) => {
  const [errorMessage, setErrorMesaage] = useState<string | undefined>()

  const address = useAddress()
  const message = 'I am requesting content'
  const sdk = useSDK()

  const renderedContent = useCallback(() => {
    if (content && content.fileType.startsWith('video')) {
      return <video controls src={content.url} style={{ maxWidth: '100%' }} />
    } else if (content && content.fileType.startsWith('image')) {
      return (
        <img
          src={content.url}
          alt='Content'
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )
    } else if (content && content.fileType.startsWith('audio')) {
      return <audio controls src={content.url} />
    } else if (
      content &&
      (content.fileType === 'link' || content.fileType === 'unknown')
    ) {
      return (
        <a
          className='content-link'
          style={{
            textDecoration: 'none',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '24px',
          }}
          href={content.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          Link to Content
        </a>
      )
    }
  }, [content])

  console.log(content.ContentAddresses[0])

  useEffect(() => {
    if (address) {
      const compareAddresses = async () => {
        const signature = (await sdk?.wallet.sign(message)) as string
        const signedAddress = sdk?.wallet.recoverAddress(message, signature)
        if (signedAddress === address) {
          const contentAddress = content.ContentAddresses.find(
            (myAddress: any) => myAddress.address.address == signedAddress
          )
          if (!contentAddress) {
            setErrorMesaage('You do not have access to this content')
          }
        } else {
          setErrorMesaage('Sorry, The Address is Invalid!!')
        }
      }
      compareAddresses()
    }
  }, [address])

  return (
    <main>
      {!address && (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            gap: 3,
            zIndex: 20,
          }}
        >
          <ConnectWallet
            className='connect-wallet'
            theme='dark'
            btnTitle='Connect Wallet'
          />
        </div>
      )}
      {address && errorMessage && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <h2 style={{ color: '#0091ff' }}>{errorMessage}</h2>
        </div>
      )}
      {address && !content && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <Loader />
        </div>
      )}
      {address && content && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          {renderedContent()}
        </div>
      )}
    </main>
  )
}

export default ServeContent
