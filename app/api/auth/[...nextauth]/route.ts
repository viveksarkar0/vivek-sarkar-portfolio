import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import type { JWT } from "next-auth/jwt"
import prisma from "@/app/lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // ✅ Using JWT session
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (user.email) {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          })

          if (!existingUser) {
            // Create a new user in the database
            await prisma.user.create({
              data: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
              },
            })
          }
        } else {
          console.error("User email is missing")
          return false // Deny sign in if email is not available
        }

        return true // Allow sign in
      } catch (error) {
        console.error("Error during signIn callback:", error)
        return false // Deny sign in
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
