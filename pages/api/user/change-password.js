import { getSession } from "next-auth/client"
import { hashPassword, verifyPassword } from "../../../lib/auth"
import { connectToDatabase } from "../../../lib/mongodb"

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return
  }

  // IMPORTANT, remeber to protect the route with getSession
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" })
    return
  }
  // IMPORTANT

  const { oldPassword, newPassword } = req.body
  const userEmail = session.user.email

  const client = await connectToDatabase()

  const db = client.db("next-auth-training")

  const userCollection = db.collection("users")

  const user = await userCollection.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: "User not found!" })
    client.close()
    return
  }

  const currentPassword = user.password

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid old password!" })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  )

  client.close()

  res.status(201).json({ message: "Password changed!" })
}

export default handler
