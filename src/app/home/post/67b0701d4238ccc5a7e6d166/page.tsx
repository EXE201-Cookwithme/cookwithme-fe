import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b0701d4238ccc5a7e6d166";
const fetchPostById = async () => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/post/${postId}`,
      {
        cache: "force-cache",
      }
    );
    const res = await fetchData.json();
    return {
      ...res.data,
      images: res.data.images.map(
        (img: string) =>
          `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${img}`
      ),
    };
  } catch (e) {
    console.log(e);
    toast.error("Error fetching post by id");
  }
};
const Page = async () => {
  const post = await fetchPostById();
  const auth: User | null = await currentUser();
  return (
    <section className="w-[70%] mx-auto py-8 mt-5">
      <div className="flex flex-col gap-5 p-5 text-center mb-7">
        <h1 className="lg:text-5xl text-3xl font-bold">{post.title}</h1>
        <div className="text-sm font-semibold">
          <Badge>{post.categoryId.name}</Badge>
        </div>
        <p className="text-md leading-6 text-gray-700">{post.description}</p>
        <p className="text-sm font-semibold">
          Posted {""}
          <span>{formatDate(post.createAt)}</span> by <span>{post.author}</span>
        </p>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-9 bg-white p-5 rounded-md shadow-md">
          <Image
            src={post.images[0]}
            alt="Limoncello"
            width={500}
            height={500}
            className="w-full h-auto pb-5"
          />

          <div className="flex flex-col text-gray-700 leading-relaxed gap-5">
            <h1 className="text-2xl font-bold text-gray-800">
              Phở Bò (Việt Nam) – Bí quyết nước dùng trong và ngọt tự nhiên
            </h1>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-red-600">Mẹo hay:</h2>
              <p className="mt-2">
                🔥 Nướng hành tây và gừng trước khi cho vào nồi nước dùng sẽ
                giúp tăng hương vị đặc trưng của phở.
              </p>
            </div>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-green-600">
                Kỹ thuật thực hiện:
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>
                  ✅ Xương bò nên được chần qua nước sôi rồi rửa sạch để loại bỏ
                  tạp chất, giúp nước dùng trong.
                </li>
                <Image
                  src={post.images[2]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <li>
                  ✅ Hầm xương ít nhất 6-8 tiếng với lửa nhỏ để chiết xuất vị
                  ngọt tự nhiên.
                </li>
                <li>
                  ✅ Khi nước dùng sôi, hớt bọt liên tục để nước không bị đục.
                </li>
              </ul>
            </div>
          </div>
          <div className="py-7 flex flex-col gap-8">
            <Comment postId={post._id} clerkId={auth?.id} />
          </div>
        </div>

        <div className="col-span-3">
          <Recent postId={post._id} categoryName={post.categoryId.name} />
        </div>
      </div>
    </section>
  );
};

export default Page;
