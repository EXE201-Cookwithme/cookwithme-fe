import React from "react";
import { SignIn } from "@clerk/nextjs";
export const runtime = "edge";
type Props = {};

const SignInPage = (props: Props) => {
  return <SignIn />;
};

export default SignInPage;
