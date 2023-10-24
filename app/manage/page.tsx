import { db } from '@/libs/drizzle/db'
import ManageUser from './ManageUser'

async function getUsers() {
  const response = await db.query.users.findMany({
    orderBy: (user, { desc }) => [desc(user.createdAt)],
  })

  return response
}

const Manage = async () => {
  const users = await getUsers()
  return (
    <main>
      <ManageUser users={users} />
    </main>
  )
}

export default Manage
