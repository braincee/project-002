import ServeContent from '@/components/ServeContent'
import { db } from '@/db/drizzle'

const getContent = async ({ contentId }: { contentId: string }) => {
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
  })
  return response[0]
}

const ServeContentPage = async ({
  params,
}: {
  params: { contentId: string }
}) => {
  const { contentId } = params
  const content = await getContent({ contentId })

  return (
    <main>
      <ServeContent content={content} />
    </main>
  )
}

export default ServeContentPage
