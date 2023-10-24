import { db } from '@/libs/drizzle/db'
import { users } from '@/libs/drizzle/schema'

export async function POST(req: Request) {
  const data = await req.json()
  const date = new Date()
  const response = await db
    .insert(users)
    .values({ ...data, createdAt: date, updatedAt: date })
  return Response.json({ response })
}
