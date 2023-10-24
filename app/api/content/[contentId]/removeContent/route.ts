import { db } from '@/libs/drizzle/db'
import { addresses, contents } from '@/libs/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const { id, keep_orfans } = await req.json()
  if (keep_orfans) {
    await db.delete(contents).where(eq(contents.id, id))
  } else {
    const content = await db.query.contents.findMany({
      where: eq(contents.id, id),
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

    const myAddresses = content[0].ContentAddresses

    await db.delete(contents).where(eq(contents.id, id))

    if (myAddresses.length === 1) {
      db.delete(addresses).where(eq(addresses.id, myAddresses[0].address.id))
    }
  }
  return Response.json({ response: 'Success' })
}
