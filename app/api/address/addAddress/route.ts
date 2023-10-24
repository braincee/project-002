import { db } from '@/libs/drizzle/db'
import { addresses } from '@/libs/drizzle/schema'

export async function POST(req: Request) {
  const data = await req.json()
  const date = new Date()
  const response = await db
    .insert(addresses)
    .values({ ...data, createdAt: date, updatedAt: date })
  return Response.json({ response })
}
