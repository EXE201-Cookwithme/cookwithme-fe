import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b069c54238ccc5a7e6d15d";
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
            <h1 className="text-2xl font-bold text-gray-800">
              PHỞ BÒ NAM ĐỊNH (VIỆT NAM 🇻🇳) 🍜
            </h1>
            <div className="mt-4">
              <p className="mt-2">
                Phở bò Nam Định được xem là món đặc sản nhất định phải thử khi
                đến đây. Phở Nam Định có hương vị khá khác biệt so với phở Hà
                Nội với nước dùng trong, thơm mùi gừng hòa quyện cùng các loại
                gia vị và sự béo ngậy của thịt bò tạo nên hương vị đặc trưng vô
                cùng riêng biệt.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-red-600">
                Nguyên liệu cần chuẩn bị:
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>800 gram thịt bắp bò</li>
                <li>1.5kg thịt nạm bò</li>
                <li>500 gram thịt bò</li>
                <li>3kg xương ống</li>
                <li>1 củ hành tây, 7 củ hành tím, 5 nhánh hành lá</li>
                <li>1 củ gừng, 8 nhánh đinh hương, 2 nhánh cam thảo</li>
                <li>2 quả thảo quả, 3 bông hoa hồi</li>
                <li>15g hạt mùi, 23g tiểu hồi, 4g trần bì, 2 nhánh quế</li>
                <li>4 muỗng canh rượu trắng, 4 muỗng canh giấm</li>
                <li>80g đường phèn, 3 muỗng canh nước mắm, muối, hạt nêm</li>
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-green-600">
                Cách nấu phở bò Nam Định:
              </h2>
              <ul className="list-decimal list-inside mt-2 space-y-2">
                <li>
                  <span className="font-bold">Sơ chế nguyên liệu:</span> Rửa
                  sạch thịt bò, xương ống với muối, giấm và rượu trắng để loại
                  bỏ mùi hôi.
                </li>
                <Image
                  src={post.images[1]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <li>
                  <span className="font-bold">Nướng nguyên liệu:</span> Nướng
                  hành tím, hành tây, gừng đến khi thơm, sau đó bóc vỏ và cho
                  vào túi lọc.
                </li>
                <Image
                  src={post.images[2]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <li>
                  <span className="font-bold">Rang gia vị:</span> Rang hoa hồi,
                  quế, thảo quả, cam thảo, trần bì cùng hạt mùi, tiểu hồi và
                  đinh hương để dậy mùi.
                </li>
                <Image
                  src={post.images[3]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <li>
                  <span className="font-bold">Nấu nước dùng:</span> Đun sôi 10
                  lít nước, cho xương ống vào nấu trong 15-20 phút, vớt bọt rồi
                  thêm túi lọc gia vị.
                </li>
                <Image
                  src={post.images[4]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <li>
                  <span className="font-bold">Hầm nước dùng:</span> Nấu với lửa
                  nhỏ trong 8-12 tiếng, nêm nếm gia vị cho vừa ăn.
                </li>
                <Image
                  src={post.images[5]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <li>
                  <span className="font-bold">Hoàn thành:</span> Trụng bánh phở,
                  xếp thịt bò, chan nước dùng và rắc hành lá lên trên.
                </li>
              </ul>
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
