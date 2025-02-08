import { BookMarked } from "lucide-react";
import Link from "next/link";

type Props = {};

const Recent = (props: Props) => {
  return (
    <div>
      <p className="pb-3 text-xl lg:text-2xl font-bold">Recent articles</p>
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {[...Array(3)].map((_, index) => {
            return (
              <li key={index}>
                <Link
                  href="/"
                  className="flex items-center gap-2 hover:underline underline-offset-4"
                >
                  <BookMarked size={20} />
                  <p className="text-md font-semibold">Lemon Cake</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Recent;
