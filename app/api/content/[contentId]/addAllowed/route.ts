import { db } from '@/libs/drizzle/db'
import { contentAddresses, logs } from '@/libs/drizzle/schema'
import { v4 as uuidV4 } from 'uuid'

export async function POST(req: Request) {
  const { contentId, addressIds } = await req.json()
  console.log(addressIds, contentId)
  const date = new Date()
  const response = Promise.all(
    addressIds.forEach(async (addressId: any) => {
      await db.insert(contentAddresses).values({
        addressId,
        contentId,
        createdAt: date,
        updatedAt: date,
      })
    })
  )
  const id: any = uuidV4()
  const data = {
    id: id,
    log: date as any,
  }
  await db.insert(logs).values({ ...data, createdAt: date, updatedAt: date })

  return Response.json({ response })
}
