"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Category } from "@/constants/types";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { UserPlan } from "@/constants";

const HeaderSlider = () => {
  const pathname = usePathname();
  const pathLogoImage = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/logo2-cookwithme.png`;
  const user = useUserStore((state) => state.user);
  return (
    <header className="bg-green-900 ">
      <div className="container py-6 w-[80%] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-5 md:gap-2 lg:gap-0">
          <Link href="/home">
            <div className="flex items-center  text-white">
              <Image src={pathLogoImage} alt="logo" width={50} height={50} />
              <h2 className="font-bold text-3xl">Cookwithme</h2>
            </div>
          </Link>
          <ul className="flex flex-row items-center gap-4 flex-wrap text-white font-bold">
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
      </div>
    </header>
  );
};

export default HeaderSlider;
