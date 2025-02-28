import Chatbot from "@/components/chatbot";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { Category, UserBe } from "@/constants/types";
import UserProvider from "@/providers/UserProvider";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
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
const fetchUserByToken = async (token: string) => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching user by token");
  }
};

const Layout = async ({ children }: Props) => {
  const categories: Category[] = await fetchCategories();
  return (
    <div className="flex flex-col min-h-screen bg-green-100 relative">
      <Header categories={categories} />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
