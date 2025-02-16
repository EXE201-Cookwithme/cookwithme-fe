import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b072694238ccc5a7e6d169";
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
              Bánh Xèo (Việt Nam) – Làm sao để giòn lâu?
            </h1>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-red-600">Mẹo hay:</h2>
              <p className="mt-2">
                🍺 Thêm một chút bia hoặc nước có ga vào bột giúp bánh có độ
                giòn rụm đặc biệt.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-green-600">
                Kỹ thuật thực hiện:
              </h2>
              <Image
                src={post.images[1]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>
                  ✅ Trước khi đổ bột, để chảo thật nóng nhưng không quá nhiều
                  dầu.
                </li>
                <li>
                  ✅ Đậy nắp 30 giây để bột chín đều, sau đó mở nắp để bánh
                  giòn.
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
