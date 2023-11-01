import { db } from '@/db/drizzle'
import { contentAddresses } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const { contentId, addressIds } = await req.json()
  const response = Promise.all(
    addressIds.forEach(async (addressId: string) => {
      await db
        .delete(contentAddresses)
        .where(
          and(
            eq(contentAddresses.contentId, contentId),
            eq(contentAddresses.addressId, addressId)
          )
        )
    })
  )
  return Response.json({ response })
}
