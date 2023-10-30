import { db } from '@/db/drizzle'
import { contents } from '@/db/schema'

export async function POST(req: Request) {
  const data = await req.json()
  const date = new Date()
  const response = await db
    .insert(contents)
    .values({ ...data, createdAt: date, updatedAt: date })

  return Response.json({ response })
}
