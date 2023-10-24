import { db } from '@/libs/drizzle/db'

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
