import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  console.log(auth);
  if (auth.statusCode === 200 || auth.statusCode === 201) return redirect(`/`);

  if (
    auth.statusCode === 403 ||
    auth.statusCode === 400 ||
    auth.statusCode === 500
  )
    return redirect("/auth/sign-in");
};

export default AuthCallbackPage;
