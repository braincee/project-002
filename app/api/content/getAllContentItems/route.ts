import { db } from '@/db/drizzle'

export async function GET() {
  const response = await db.query.contents.findMany({
    orderBy: (contents, { desc }) => [desc(contents.createdAt)],
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
  return Response.json({ response })
}
