import { getSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AuthForm from "../components/auth/auth-form"

function AuthPage() {

  const [isLoading, setIsLoading] = useState(true)

  const Router = useRouter()
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        Router.replace("/profile")
      } else {
        setIsLoading(false)
      }
    })
  }, [Router])

  if (isLoading) {
    return <p className="center">Loading...</p>
  }

  return <AuthForm />
}

export default AuthPage
