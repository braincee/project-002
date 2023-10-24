import { db } from '@/libs/drizzle/db'

export async function GET() {
  const response = await db.query.users.findMany({
    orderBy: (users, { desc }) => [desc(users.createdAt)],
  })

  return Response.json({ response })
}
