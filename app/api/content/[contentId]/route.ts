import { db } from "@/libs/drizzle/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const contentId = searchParams.get("contentId");
  if (contentId) {
    const response = await db.query.contents.findMany({
      where: (content, { eq }) => eq(content.id, contentId),
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
    });

    return Response.json({ response });
  }
}
