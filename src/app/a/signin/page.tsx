import Logo from "@/components/logo";
import { auth } from "auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import SigninAuthUserForm from "@/components/auth/SigninAuthUserForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign up for an account.",
};

export default async function Example() {
  const session = await auth();

  // if (session) {
  //   redirect("/a");
  // }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto h-12 w-auto text-sky-600" />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign-in to your Account
        </h2>
      </div>
      <SigninAuthUserForm />
    </div>
  );
}
