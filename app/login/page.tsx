"use client"

import { Frame } from "lucide-react"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Guestbook } from "../guestbook/guestbook"

const initialComments = [
  {
    id: "1",
    content: "Welcome to our guestbook! Feel free to leave a message.",
    createdAt: new Date().toISOString(),
    user: {
      name: "Admin",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    },
    replies: [],
  },
]

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignIn = async (provider: string) => {
    const result = await signIn(provider, { callbackUrl: "/guestbook", redirect: false });
  
    if (result?.ok) {
      setTimeout(() => router.push("/guestbook"), 100) // Delay to ensure session updates
    } else {
      console.error("Login failed", result)
    }
  };
  

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Our Guestbook
          </h1>
          {!session && (
            <Button onClick={() => handleSignIn("google")} >
              Sign In
            </Button>
          )}
        </div>
        <Guestbook initialComments={initialComments} />
      </div>
    </main>
  )
}
