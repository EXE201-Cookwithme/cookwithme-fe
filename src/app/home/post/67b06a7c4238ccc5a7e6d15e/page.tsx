import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b06a7c4238ccc5a7e6d15e";
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
            <h1 className="text-2xl font-bold text-red-600">
              KIMCHI (HÀN QUỐC 🇰🇷) 🌶️
            </h1>
            <p className="mt-4 text-gray-700">
              Kimchi là món dưa muối lên men cay nồng, mang đặc trưng ẩm thực
              Hàn Quốc. Món ăn này không chỉ là món ăn kèm mà còn là nguyên liệu
              chính cho nhiều món khác như canh kimchi, cơm rang kimchi.
            </p>
            <h2 className="mt-6 text-lg font-semibold text-red-500">
              Nguyên liệu (Cho 4 người)
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>2 bắp cải thảo (loại to)</li>
              <li>2 củ cà rốt</li>
              <li>2 củ hành tây</li>
              <li>130g hành lá, 120g hẹ</li>
              <li>2 quả táo, 100g tỏi, 20g gừng</li>
              <li>100g tôm khô, 120g ớt bột Hàn Quốc, 30g ớt bột Việt Nam</li>
              <li>50ml nước mắm, 500g muối hạt</li>
              <li>Mè rang, muối, bột ngọt (tùy chọn)</li>
            </ul>
            <h2 className="mt-6 text-lg font-semibold text-green-600">
              Cách làm Kimchi
            </h2>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>
                <span className="font-bold">Sơ chế cải thảo:</span> Cắt đôi, rửa
                với nước muối, xát muối vào từng bẹ, ngâm 2-5 tiếng, rửa sạch và
                để ráo.
              </li>
              <Image
                src={post.images[1]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Sơ chế nguyên liệu khác:</span> Cắt
                sợi cà rốt, hành lá, hẹ, táo cắt nhỏ, hành tây cắt múi cau, tôm
                khô ngâm mềm.
              </li>
              <Image
                src={post.images[2]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Nấu bột nếp:</span> Khuấy 500ml nước
                với 70g bột nếp, đun đến khi sánh trong, để nguội.
              </li>
              <Image
                src={post.images[3]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Xay hỗn hợp sốt:</span> Xay nhuyễn
                táo, hành tây, gừng, tỏi, tôm khô, nước mắm, bột ngọt.
              </li>
              <Image
                src={post.images[4]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Trộn kimchi:</span> Trộn hỗn hợp sốt
                với ớt bột, bột nếp, hành, hẹ, cà rốt. Phết đều lên từng bẹ cải
                thảo.
              </li>
              <Image
                src={post.images[5]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Lên men:</span> Để ở nhiệt độ phòng
                1-2 ngày rồi bảo quản trong tủ lạnh.
              </li>
              <Image
                src={post.images[6]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
            </ol>
            <h2 className="mt-6 text-lg font-semibold text-orange-500">
              Thành phẩm
            </h2>
            <p className="text-gray-700">
              Kimchi giòn, chua ngọt nhẹ, cay nồng, thích hợp ăn kèm hoặc chế
              biến món khác như canh kimchi, cơm chiên kimchi.
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
