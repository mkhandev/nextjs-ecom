"use client";

import { signInFormSchema } from "../validators";
import { signIn, signOut } from "next-auth/react";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };

    // const res = await signIn("credentials", {
    //   ...user,
    //   redirect: false,
    // });

    // console.log("signIn result:", res);

    // if (res?.ok) {
    //   alert("Successfully signed in");
    // } else {
    //   alert("Invalid login");
    // }

    //return { success: true, message: "Successfully login" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

export async function signOutUser() {
  await signOut();
}
