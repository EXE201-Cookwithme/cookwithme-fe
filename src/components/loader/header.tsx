type Props = {};
import { ChefHat, User2, User2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-separator";
const Header = (props: Props) => {
  return (
    <header className="bg-green-900">
      <div className="container py-6 w-[80%] mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 text-white">
              <ChefHat size={40} />
              <h2 className="font-bold text-3xl">Cookwithme</h2>
            </div>
          </Link>
          <div className="flex flex-row gap-5 justify-center items-center">
            <Link href="/workshop">
              <Button
                variant={"secondary"}
                className="bg-green-700 text-white hover:bg-green-800 "
              >
                Workshops
              </Button>
            </Link>
            <Link href="/create">
              <Button
                variant={"secondary"}
                className="bg-green-700 text-white hover:bg-green-800 "
              >
                Create Post
              </Button>
            </Link>
            <Link href="/">
              <Button className="text-base bg-green-700 text-white hover:bg-green-800 flex gap-x-2">
                <User2Icon />
                Login
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-7 py-4">
          <ul className="flex gap-8 text-white font-bold">
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Main Dishes
              </Link>
            </li>
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Snacks
              </Link>
            </li>
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Soups
              </Link>
            </li>
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Side dishes
              </Link>
            </li>
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Desserts
              </Link>
            </li>
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Baking
              </Link>
            </li>
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Beverages
              </Link>
            </li>
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Tips and Techniques
              </Link>
            </li>
            <li>
              <Link
                href="/category/123456"
                className="hover:underline underline-offset-4"
              >
                Product Reviews / Guest Posts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
