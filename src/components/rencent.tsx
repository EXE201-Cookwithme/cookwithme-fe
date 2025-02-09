
import { Post } from "@/constants/types";
import { Bird, BookMarked } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  postId: string;
  categoryName: string;
};
const fetchPostByCategoryName = async (
  postId: string,
  categoryName: string
) => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/post/category/${categoryName}`,
      {
        cache: "force-cache",
      }
    );
    const res = await fetchData.json();
    const filteredPosts = res.data.filter((post: Post) => post._id !== postId);
    return filteredPosts; // Trả về danh sách bài viết đã lọc
  } catch (e) {
    console.log(e);
    toast.error("Error fetching post by category id");
  }
};
const Recent = async ({ postId, categoryName }: Props) => {
  const postRelates =
    (await fetchPostByCategoryName(postId, categoryName)) || [];
  return (
    <div className="p-3 bg-white rounded-sm shadow-md min-h-[16rem] max-h[20rem] ">
      <p className="pb-3 text-xl lg:text-2xl font-bold text-center">
        Recent articles
      </p>
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {postRelates.length > 0 &&
            postRelates.map((post: Post, index: number) => {
              return (
                <li key={index} className="flex flex-row items-center gap-2">
                  <BookMarked size={35} />
                  <Link
                    href={"/home/post/" + post._id}
                    className=" hover:underline underline-offset-4"
                  >
                    <p className="text-sm font-semibold">{post.title}</p>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      {postRelates.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[16rem]">
          <Bird size={70} />
          <p className="text-xl italic text-center">Not posts ...</p>
        </div>
      )}
    </div>
  );
};

export default Recent;
