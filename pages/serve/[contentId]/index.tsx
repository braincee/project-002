import { Address, Content } from '@/libs/models'
import { Box, Button, Typography } from '@mui/joy'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { ConnectWallet, useSDK } from '@thirdweb-dev/react'
import { useAddress } from '@thirdweb-dev/react'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { contentId } = context.query as any
    try {
        const content = JSON.stringify(
            await Content.findByPk(contentId, {
                include: { model: Address },
            }),
        )
        return {
            props: { content: JSON.parse(content) },
        }
    } catch {
        return {
            props: { content: 'No content found' },
        }
    }
}

const ServeContent = ({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [viewStatus, setViewStatus] = useState<boolean>(false)

    const address = useAddress()
    // const address = "0x1b5E9G7e1402q7yy9E47E16Ebc09FE7155A74B09"; //This was used to text for when address is available
    // const message = "I am requesting content";
    // const sdk = useSDK();

    let renderedContent
    useEffect(() => {
        const contentAddress =
            content.Addresses &&
            content.Addresses.find((myaddress: any) => myaddress.address === address)
        if (contentAddress) {
            setViewStatus(true)
        }
    }, [address])

    if (content.fileType && content.fileType.startsWith('video')) {
        renderedContent = <video controls src={content.url} style={{ maxWidth: '100%' }} />
    } else if (content.fileType && content.fileType.startsWith('image')) {
        renderedContent = (
            <img src={content.url} alt='Content' style={{ maxWidth: '100%', height: 'auto' }} />
        )
    } else if (content.fileType && content.fileType.startsWith('audio')) {
        renderedContent = <audio controls src={content.url} />
    } else if (
        content.fileType &&
        (content.fileType === 'link' || content.fileType === 'unknown')
    ) {
        renderedContent = (
            <Button
                variant='outlined'
                component='a'
                href={content.url}
                target='_blank'
                rel='noopener noreferrer'
            >
                Link to Content
            </Button>
        )
    } else {
        renderedContent = <p>Unsupported Content Type</p>
    }

    return (
        <>
            <Head>
                <title>NFT Gated Server</title>
                <meta name='robots' content='follow, index' />
                <meta name='description' content='description' />
            </Head>
            {content === 'No content found' ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100vh',
                        pt: 10,
                    }}
                >
                    <Typography level='h3'>Content Not Found </Typography>
                </Box>
            ) : address && viewStatus ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', height: '100%', p: 10 }}>
                        {renderedContent}
                        <Typography level='h5'>{content.title}</Typography>
                        <Typography level='body1'>{content.description}</Typography>
                    </Box>
                </Box>
            ) : address ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100vh',
                        pt: 10,
                    }}
                >
                    <Typography level='h3'>You do not have access to this content</Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        zIndex: 20,
                    }}
                >
                    <ConnectWallet
                        className='connect-wallet'
                        theme='dark'
                        btnTitle='Connect Wallet'
                    />
                </Box>
            )}
        </>
    )
}

export default ServeContent
