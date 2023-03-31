import { hashPassword } from "../../../lib/auth"
import { connectToDatabase } from "../../../lib/mongodb"

async function handler(req, res) {
  if (req.method !== "POST") {
    return
  }

  const { email, password } = req.body

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input - password should be at least 7 characters long.",
    })
    return
  }

  const client = await connectToDatabase()

  const db = client.db("next-auth-training")

  const existingUser = await db.collection("users").findOne({ email: email })

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = db
    .collection("users")
    .insertOne({ email: email, password: hashedPassword })

  res.status(201).json({ message: "Created user!" })
}

export default handler
