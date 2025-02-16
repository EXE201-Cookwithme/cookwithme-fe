import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b05ce44238ccc5a7e6d14d";
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
            <h1 className="text-2xl font-bold text-green-600">
              Cách Nấu Súp Nấm Thanh Đạm, Bổ Dưỡng Cho Cả Gia Đình
            </h1>
            <p className="mt-2 text-gray-700">
              Súp nấm là món ăn thơm ngon, dễ làm và rất tốt cho sức khỏe. Cùng
              khám phá công thức nấu súp nấm đơn giản nhưng vô cùng hấp dẫn này
              nhé!
            </p>

            <h2 className="text-xl font-semibold text-green-500 mt-4">
              Nguyên Liệu Chuẩn Bị
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>200g nấm (nấm hương, nấm rơm hoặc nấm kim châm)</li>
              <li>1 củ hành tây</li>
              <li>2 tép tỏi băm nhỏ</li>
              <li>500ml nước dùng gà (hoặc nước lọc)</li>
              <li>1 thìa bơ lạt</li>
              <li>1 thìa bột năng (hoặc bột bắp) để tạo độ sánh</li>
              <li>1 quả trứng gà</li>
              <li>Muối, hạt tiêu, gia vị tùy chỉnh</li>
              <li>Hành lá, ngò rí để trang trí</li>
            </ul>

            <h2 className="text-xl font-semibold text-green-500 mt-4">
              Cách Chế Biến
            </h2>
            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 1: Sơ Chế Nguyên Liệu
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Nấm rửa sạch, cắt nhỏ nếu cần.</li>
              <li>Hành tây bóc vỏ, thái nhỏ.</li>
              <li>Tỏi băm nhuyễn.</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 2: Xào Nguyên Liệu
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Bắc nồi lên bếp, cho bơ vào đun nóng.</li>
              <li>
                Phi thơm hành tây và tỏi, sau đó cho nấm vào xào sơ trong 2-3
                phút.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 3: Nấu Súp
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Đổ nước dùng gà vào nồi, đun sôi rồi hạ nhỏ lửa.</li>
              <li>Nấu trong 10-15 phút cho nấm chín mềm.</li>
              <li>
                Hòa tan bột năng với nước lạnh rồi từ từ cho vào nồi, khuấy đều
                để tạo độ sánh.
              </li>
              <li>
                Đánh tan trứng gà rồi đổ từ từ vào nồi, khuấy nhẹ để tạo sợi
                trứng.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 4: Hoàn Thiện Món Ăn
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Nêm muối, hạt tiêu vừa ăn.</li>
              <li>Đun thêm 2 phút rồi tắt bếp.</li>
            </ul>

            <h2 className="text-xl font-semibold text-green-500 mt-4">
              Thưởng Thức
            </h2>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <p className="text-gray-700">
              Múc súp ra bát, rắc hành lá và ngò rí lên trên. Dùng nóng kèm bánh
              mì hoặc salad rau tươi.
            </p>

            <h2 className="text-xl font-semibold text-green-500 mt-4">
              Lợi Ích Của Súp Nấm
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Giàu chất xơ và vitamin, hỗ trợ tiêu hóa.</li>
              <li>Cung cấp protein thực vật, tốt cho sức khỏe.</li>
              <li>Thích hợp cho người ăn chay và cả gia đình.</li>
            </ul>

            <p className="mt-4 text-gray-700 font-medium">
              Hãy thử ngay công thức này để cả gia đình cùng thưởng thức bữa ăn
              thanh đạm, bổ dưỡng nhé!
            </p>
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
