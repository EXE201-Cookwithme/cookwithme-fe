"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Category } from "@/constants/types";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { categoryRecord, UserPlan } from "@/constants";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginGoogle from "./loginGoogle";

type Props = {
  categories: Category[];
};

const Header = ({ categories }: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const pathLogoImage = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/logo2-cookwithme.png`;
  const user = useUserStore((state) => state.user);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleLogOut = () => {
    Cookies.remove("accessToken");
    setOpen(false);
    window.location.reload();
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
      <header className="bg-green-900">
        <div className="container py-6 w-[80%] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-5 md:gap-2 lg:gap-0 relative">
            <Link href="/">
              <div className="flex items-center  text-white">
                <Image src={pathLogoImage} alt="logo" width={50} height={50} />
                <h2 className="font-bold text-3xl">Cookwithme</h2>
              </div>
            </Link>
            <ul className="flex flex-row items-center font-bold gap-4 flex-wrap text-white">
              <li>
                <Link
                  href="/"
                  className=" hover:underline-offset-5 hover:underline"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:underline-offset-2 hover:underline"
                  href="/home"
                >
                  Công thức
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:underline-offset-2 hover:underline"
                  href="/home/workshop"
                >
                  Workshop
                </Link>
              </li>
              <li>
                <Link
                  className=" hover:underline-offset-2 hover:underline"
                  href="/home/payment"
                >
                  Gói dịch vụ
                </Link>
              </li>
              {user ? (
                <div>
                  <Image
                    src={user.image}
                    alt="logo"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    onMouseDown={(e) => {
                      e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
                      setOpen((prev) => !prev);
                    }}
                  />
                </div>
              ) : (
                <LoginGoogle />
              )}
              {open && (
                <div
                  className="absolute right-0 top-12 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 text-black z-50"
                  ref={menuRef}
                >
                  <div className="p-2 border-b mb-2">
                    <p>{user?.lastname + " " + user?.firstname}</p>
                  </div>

                  <button
                    className="w-full rounded-lg text-left p-2 hover:bg-gray-200"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              )}
            </ul>
          </div>
          <div className="flex flex-row items-center justify-center mt-7 py-4">
            <ul className="flex flex-wrap justify-center lg:gap-6 md:gap-4 gap-3 text-white font-bold">
              {categories.map((category: Category, index) => {
                const categoryPath = `/home/category/${category.name}`;
                return (
                  <li key={index}>
                    <Link
                      href={categoryPath}
                      className={`hover:underline underline-offset-4 ${
                        pathname === categoryPath
                          ? "text-yellow-400 underline-offset-8 underline decoration-6"
                          : ""
                      }`}
                    >
                      {categoryRecord[category.name] ||
                        category.name.split("-").join(" ")}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
    </GoogleOAuthProvider>
  );
};

export default Header;
