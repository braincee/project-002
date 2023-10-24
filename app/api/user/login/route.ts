import { NextApiRequest, NextApiResponse } from 'next'
import { compareSync } from 'bcrypt-ts'
import { db } from '@/libs/drizzle/db'

const comparePassword = (password: string, hash: any) => {
  const result = compareSync(password, hash)
  return result
}

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.email, email),
  })

  let response
  if (user) {
    const status = comparePassword(password, user[0].password)

    if (status) {
      response = {
        id: user[0].id,
        email: user[0].email,
      }
    } else {
      response = 'Invalid password'
    }
  } else {
    response = null
  }

  return Response.json(response)
}
