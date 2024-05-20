import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import {db} from "@/db";
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  pages: {
    signIn: "/auth/sign-in"
  }
})
