import { db } from "@/db/drizzle";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const addressId = searchParams.get("addressId");
  if (addressId) {
    const response = await db.query.addresses.findMany({
      where: (address, { eq }) => eq(address.id, addressId),
      with: {
        ContentAddresses: {
          columns: {
            contentId: false,
            addressId: false,
            createdAt: false,
            updatedAt: false,
          },
          with: {
            content: true,
          },
        },
      },
    });

    return Response.json({ response });
  }
}
