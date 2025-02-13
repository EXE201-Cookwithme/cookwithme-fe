import Chatbot from "@/components/chatbot";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { Category, UserBe } from "@/constants/types";
import UserProvider from "@/providers/UserProvider";
import { currentUser, User } from "@clerk/nextjs/server";
import React from "react";
import { toast } from "sonner";

type Props = { children: React.ReactNode };
const fetchCategories = async () => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/category`, {
      cache: "no-cache",
    });
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching categories");
  }
};

const fetchUserByClerkId = async (clerkId: string) => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/user/${clerkId}`
    );
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching user by clerk id");
  }
};
const Layout = async ({ children }: Props) => {
  const categories: Category[] = await fetchCategories();
  const auth: User | null = await currentUser();
  const user: UserBe = await fetchUserByClerkId(auth?.id as string);
  return (
    <UserProvider user={user}>
      <div className="flex flex-col min-h-screen bg-green-100 relative">
        <Header categories={categories} />
        {children}
        <Footer />
        <Chatbot />
      </div>
    </UserProvider>
  );
};
export default Layout;
