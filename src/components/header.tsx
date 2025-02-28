"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Category } from "@/constants/types";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { categoryRecord, UserPlan } from "@/constants";

type Props = {
  categories: Category[];
};

const Header = ({ categories }: Props) => {
  const pathname = usePathname();
  const pathLogoImage = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/logo2-cookwithme.png`;
  const user = useUserStore((state) => state.user);
  return (
    <header className="bg-green-900">
      <div className="container py-6 w-[80%] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-5 md:gap-2 lg:gap-0">
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
  );
};

export default Header;
