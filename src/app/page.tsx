import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  //Authentication
  const auth = await onAuthenticateUser();
  if (auth.statusCode === 200 || auth.statusCode === 201)
    return redirect(`/home`);
  if (
    auth.statusCode === 400 ||
    auth.statusCode === 500 ||
    auth.statusCode === 404 ||
    auth.statusCode === 403
  ) {
    return redirect("/auth/sign-in");
  }
};

export default Page;
