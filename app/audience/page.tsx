import { db } from '@/libs/drizzle/db'
import Audience from './Audience'

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

const AddressList = async () => {
  const addresses = await getAddresses()
  const contentItems = await getContentItems()
  return (
    <main>
      <Audience addresses={addresses} contentItems={contentItems} />
    </main>
  )
}

export default AddressList
