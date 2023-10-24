import { db } from '@/libs/drizzle/db'

export async function GET(req: Request) {
  const { addressId } = await req.json()
  const response = await db.query.addresses.findMany({
    where: (address, { eq }) => eq(address.id, addressId),
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

  return Response.json({ response })
}
