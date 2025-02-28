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
              Khám phá hơn 1000 công thức nấu ăn trong tay bạn với công thức nấu
              ăn tuyệt vời nhất. Giúp bạn tìm ra công thức nấu ăn dễ nhất.
            </div>
          </div>
          <div className="w-[40%]">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 md:gap-2 lg:gap-1">
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
                      Chi tiết
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="text-slate-400  hover:text-white"
                    >
                      Chức năng
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#recipes"
                      className="text-slate-400  hover:text-white"
                    >
                      Công thức
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="text-slate-400  hover:text-white tracking-wide"
                    >
                      Gói dịch vụ
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
