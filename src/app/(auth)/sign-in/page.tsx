import React from "react";
import { signIn } from "@/auth"
import GithubIcon from "@/components/icons/GithubIcon";
import {Button} from "@/components/ui/button";

const SignInPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
          </div>
          <form
            action={async () => {
              "use server"
              await signIn("github")
            }}
          >
            <Button className="w-full" variant="outline">
              <GithubIcon className="mr-2 h-5 w-5"/>
              Sign in with GitHub
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
