import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { statusCode: 403 };
    }
    const userExist = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/user/${user.id}`
    );

    if (userExist.status === 200) {
      return userExist.json();
    }

    const newUser = await fetch(`${process.env.NEXT_PUBLIC_BE}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
      }),
    });

    if (newUser) {
      return newUser.json();
    }
    return { statusCode: 400 };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { statusCode: 500 };
  }
};
