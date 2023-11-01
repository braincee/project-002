import { db } from '@/db/drizzle'
import { contentAddresses } from '@/db/schema'

export async function POST(req: Request) {
  const { addressId, contentIds } = await req.json()
  const date = new Date()
  const response = Promise.all(
    contentIds.forEach(async (contentId: any) => {
      await db.insert(contentAddresses).values({
        addressId,
        contentId,
        createdAt: date,
        updatedAt: date,
      })
    })
  )

  return Response.json({ response })
}
