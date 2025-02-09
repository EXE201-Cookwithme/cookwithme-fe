"use client";
import { ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { toast } from "sonner";
import { Category } from "@/constants/types";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Props = {
  categories: Category[];
};
const Header = ({ categories }: Props) => {
  const pathname = usePathname();
  const pathLogoImage = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/logo2-cookwithme.png`;

  return (
    <header className="bg-green-900">
      <div className="container py-6 w-[80%] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-5 md:gap-2 lg:gap-0">
          <Link href="/home">
            <div className="flex items-center  text-white">
              <Image src={pathLogoImage} alt="logo" width={50} height={50} />
              <h2 className="font-bold text-3xl">Cookwithme</h2>
            </div>
          </Link>
          <div className="flex flex-row gap-3 justify-center items-center ">
            <Link href="/home">
              <Button
                variant={"secondary"}
                className="bg-green-700 text-white hover:bg-green-800  min-w-[6rem] max-w-[8rem]"
              >
                Home
              </Button>
            </Link>
            <Link href="/home/workshop">
              <Button
                variant={"secondary"}
                className="bg-green-700 text-white hover:bg-green-800 min-w-[6rem] max-w-[8rem]"
              >
                Workshops
              </Button>
            </Link>
            <Link href="/home/payment">
              <Button
                variant={"secondary"}
                className="bg-green-700 text-white hover:bg-green-800 min-w-[6rem] max-w-[8rem]"
              >
                Update plan
              </Button>
            </Link>
            <UserButton />
          </div>
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
                    {category.name.split("-").join(" ")}
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
