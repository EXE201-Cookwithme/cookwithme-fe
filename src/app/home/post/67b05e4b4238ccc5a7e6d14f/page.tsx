import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b05e4b4238ccc5a7e6d14f";
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
          <Image
            src={post.images[0]}
            alt="Limoncello"
            width={500}
            height={500}
            className="w-full h-auto pb-5"
          />

          <div className="flex flex-col text-gray-700 leading-relaxed gap-5">
            <h1 className="text-2xl font-bold text-green-600">
              Bí Quyết Làm Snack Rong Biển Giòn Rụm, Ăn Là Ghiền! 🌿
            </h1>
            <p className="mt-2 text-gray-700">
              Snack rong biển không chỉ giòn rụm, thơm ngon mà còn giàu dinh
              dưỡng, thích hợp cho những ai thích ăn vặt mà vẫn muốn giữ dáng.
              Cùng khám phá cách làm món snack siêu hấp dẫn này ngay tại nhà
              nhé!
            </p>

            <h2 className="text-xl font-semibold text-green-500 mt-4">
              Nguyên Liệu Cần Chuẩn Bị
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>4 lá rong biển</li>
              <li>5 miếng bánh tráng</li>
              <li>2 muỗng canh bột phô mai</li>
              <li>100ml dầu ăn</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-green-500 mt-4">
              Cách Làm Snack Rong Biển Giòn Tan
            </h2>

            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 1: Cắt Rong Biển
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Bánh tráng cắt miếng hình chữ nhật (~1 ngón tay chiều dài, 1.5
                lóng tay chiều rộng).
              </li>
              <li>
                Rong biển cắt nhỏ hơn bánh tráng (~1 lóng tay chiều rộng).
              </li>
              <li>Thấm ít nước lên bánh tráng rồi dán miếng rong biển lên.</li>
            </ul>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 2: Chiên Rong Biển
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Đun nóng 100ml dầu ăn.</li>
              <li>Cho rong biển dán lên bánh tráng vào chảo.</li>
              <li>
                Chiên lửa nhỏ đến khi bánh tráng phồng và giòn, sau đó vớt ra.
              </li>
            </ul>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 3: Lắc Phô Mai
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Cho rong biển đã chiên vào tô.</li>
              <li>Thêm 2 muỗng canh bột phô mai, trộn đều.</li>
            </ul>
            <Image
              src={post.images[4]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <p className="italic text-gray-600 mt-3">
              💡 <strong>Mẹo nhỏ:</strong> Nếu thích vị đậm đà hơn, bạn có thể
              rắc thêm phô mai bột hoặc rong biển vụn sau khi chiên!
            </p>

            <h2 className="text-xl font-semibold text-green-500 mt-4">
              Thưởng Thức
            </h2>
            <p className="text-gray-700">
              Chỉ với vài bước đơn giản, bạn đã có ngay món snack rong biển giòn
              rụm, thơm ngon như ngoài tiệm. Hãy thử ngay và chia sẻ thành phẩm
              cùng bạn bè nhé! 🌟
            </p>
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
