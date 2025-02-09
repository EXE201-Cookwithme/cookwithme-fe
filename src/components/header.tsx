type Props = {};
import { ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { toast } from "sonner";
import { Category } from "@/constants/types";

const fetchCategories = async () => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/category`, {
      cache: "force-cache",
    });
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching categories");
  }
};
const Header = async (props: Props) => {
  const categories: Category[] = await fetchCategories();
  return (
    <header className="bg-green-900">
      <div className="container py-6 w-[80%] mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/home">
            <div className="flex items-center gap-2 text-white">
              <ChefHat size={40} />
              <h2 className="font-bold text-3xl">Cookwithme</h2>
            </div>
          </Link>
          <div className="flex flex-row gap-3 justify-center items-center">
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
            <UserButton />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-7 py-4">
          <ul className="flex gap-6 text-white font-bold">
            {categories.map((category: Category, index) => {
              return (
                <li key={index}>
                  <Link
                    href={`/home/category/${category.name}`}
                    className="hover:underline underline-offset-4"
                  >
                    {category.name}
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
