import { ChefHat } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-green-900">
      <div className="container py-10 w-[80%] mx-auto">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2 text-white">
              <ChefHat size={32} />
              <h2 className="font-bold text-xl">Cookwithme</h2>
            </div>
            <div className="text-gray-400 mt-4 text-sm w-[40%] text-justify">
              Discover 1000+ recipes in your hand with the best recipe. Help you
              to find the easiest to cook.
            </div>
          </div>
          <div className="w-[40%]">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <ul>
                  <li>
                    <h2 className="font-bold text-lg text-white">Menu</h2>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-slate-400 hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="text-slate-400  hover:text-white"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#recipes"
                      className="text-slate-400  hover:text-white"
                    >
                      Recipes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="text-slate-400  hover:text-white tracking-wide"
                    >
                      Pricing Plans
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <ul>
                  <li>
                    <h2 className="font-bold text-lg text-white">Help</h2>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-slate-400 hover:text-white"
                    >
                      Privary
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-slate-400  hover:text-white"
                    >
                      Term of Use
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <ul>
                  <li>
                    <h2 className="font-bold text-lg text-white">Social</h2>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/profile.php?id=61571498144685"
                      className="text-slate-400 hover:text-white"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-slate-400  hover:text-white"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#about"
                      className="text-slate-400  hover:text-white"
                    >
                      Twitter
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
