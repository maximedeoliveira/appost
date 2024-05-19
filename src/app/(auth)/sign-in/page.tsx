import React from "react";
import { signIn } from "@/auth"

const SignInPage = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  )
}

export default SignInPage
