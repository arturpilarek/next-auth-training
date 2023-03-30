import { hashPassword } from "../../lib/auth"
import { clientPromise } from "../../lib/mongodb"

async function handler(req, res) {
  const { email, password } = req.body

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res
      .status(422)
      .json({
        message:
          "Invalid input - password should be at least 7 characters long.",
      })
    return
  }

  const client = await clientPromise()

  const db = client.db("next-auth-training")

  const hashedPassword = await hashPassword(password)

  const result = db
    .collection("users")
    .insertOne({ email: email, password: hashedPassword })

  res.status(201).json({ message: "Created user!" })
}

export default handler
