import { db } from '@/libs/drizzle/db'
import Log from './Log'

async function getLogs() {
  const response = await db.query.logs.findMany({
    orderBy: (log, { desc }) => [desc(log.createdAt)],
  })

  return response
}

const Logs = async () => {
  const logs = await getLogs()
  return (
    <main>
      <Log logs={logs} />
    </main>
  )
}

export default Logs
