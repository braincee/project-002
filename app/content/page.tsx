import { db } from '@/libs/drizzle/db'
import Content from './Content'

async function getAddresses() {
  const response = await db.query.addresses.findMany({
    orderBy: (address, { desc }) => [desc(address.createdAt)],
    with: {
      ContentAddresses: {
        columns: {
          contentId: false,
          addressId: false,
          createdAt: false,
          updatedAt: false,
        },
        with: {
          content: true,
        },
      },
    },
  })

  return response
}

async function getContentItems() {
  const response = await db.query.contents.findMany({
    orderBy: (content, { desc }) => [desc(content.createdAt)],
    with: {
      ContentAddresses: {
        columns: {
          contentId: false,
          addressId: false,
          createdAt: false,
          updatedAt: false,
        },
        with: {
          address: true,
        },
      },
    },
  })

  return response
}

const ContentList = async () => {
  const addresses = await getAddresses()
  const contentItems = await getContentItems()
  return (
    <main>
      <Content contentItems={contentItems} addresses={addresses} />
    </main>
  )
}

export default ContentList
