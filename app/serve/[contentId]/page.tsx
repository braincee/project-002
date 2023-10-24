'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ConnectWallet, useAddress, useSDK } from '@thirdweb-dev/react'
import { getContent } from '@/libs/api'
import { useParams } from 'next/navigation'
import Loader from '@/components/Loader'

const ServeContent = () => {
  const params = useParams()
  const [errorMessage, setErrorMesaage] = useState<string | undefined>()
  const [content, setContent] = useState<any>()

  const address = useAddress()
  const message = 'I am requesting content'
  const sdk = useSDK()

  console.log(params)

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

  useEffect(() => {
    if (address) {
      const compareAddresses = async () => {
        const signature = (await sdk?.wallet.sign(message)) as string
        const signedAddress = sdk?.wallet.recoverAddress(message, signature)
        if (signedAddress === address) {
          const myContent = await getContent({
            contentId: params.contentId?.toString(),
          })
          setContent(myContent.response)
          const contentAddress = myContent.response.Addresses.find(
            (myAddress: any) => myAddress.address == signedAddress
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
      {/* <Head>
        <title>NFT Gated Server</title>
        <meta name='robots' content='noindex, nofollow' />
        <meta name='description' content='An NFT Gated Server.' />
      </Head> */}
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
