import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b071574238ccc5a7e6d168";
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
  }
};
const fetchUserByToken = async (token: string) => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching user by token");
  }
};
const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value || "";
  const post = await fetchPostById();
  const user: UserBe | null = await fetchUserByToken(token);
  return (
    <section className="w-[70%] mx-auto py-8 mt-5">
      <div className="flex flex-col gap-5 p-5 text-center mb-7">
        <h1 className="lg:text-5xl text-3xl font-bold">{post.title}</h1>
        <div className="text-sm font-semibold">
           <Badge>{categoryRecord[post.categoryId.name]}</Badge>
        </div>
        <p className="text-md leading-6 text-gray-700">{post.description}</p>
        <p className="text-sm font-semibold">
          Posted {""}
          <span>{formatDate(post.createAt)}</span> by <span>{post.author}</span>
        </p>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-9 bg-white p-5 rounded-md shadow-md">
          <div className="flex flex-col text-gray-700 leading-relaxed gap-5">
            <h1 className="text-2xl font-bold text-gray-800">
              Sushi (Nhật Bản) – Bí quyết làm cơm giấm hoàn hảo
            </h1>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-red-600">Mẹo hay:</h2>
              <p className="mt-2">
                🍚 Dùng quạt giấy hoặc quạt điện để làm nguội cơm nhanh sau khi
                trộn giấm, giúp cơm bóng đẹp và không bị nát.
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
              <ul className="list-disc list-inside my-2 space-y-2">
                <li>
                  ✅ Vo gạo nhiều lần cho đến khi nước vo trong để loại bỏ tinh
                  bột thừa.
                </li>
                <li>
                  ✅ Dùng hỗn hợp giấm gạo, đường, muối theo tỷ lệ 5:2:1 để cơm
                  có vị cân bằng.
                </li>
                <li>
                  ✅ Khi trộn giấm vào cơm, dùng muỗng gỗ và thao tác nhẹ nhàng
                  để giữ hạt cơm nguyên vẹn.
                </li>
              </ul>
              <Image
                src={post.images[0]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
            </div>
          </div>
          <div className="py-7 flex flex-col gap-8">
            <Comment postId={post._id} user={user} />
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
