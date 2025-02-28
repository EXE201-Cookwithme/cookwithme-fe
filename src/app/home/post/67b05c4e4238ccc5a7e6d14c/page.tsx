import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b05c4e4238ccc5a7e6d14c";
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
            src={post.images[1]}
            alt="Limoncello"
            width={500}
            height={500}
            className="w-full h-auto pb-5"
          />

          <div className="flex flex-col text-gray-700 leading-relaxed gap-5">
            <h1 className="text-2xl font-bold text-orange-600">
              Cách Nấu Súp Ngô Béo Ngậy, Thơm Ngon Cho Cả Gia Đình
            </h1>
            <p className="mt-2 text-gray-700">
              Súp ngô là món ăn dễ làm, bổ dưỡng và phù hợp với mọi thành viên
              trong gia đình. Hãy cùng khám phá công thức nấu súp ngô ngon tuyệt
              vời này nhé!
            </p>

            <h2 className="text-xl font-semibold text-orange-500 mt-4">
              Nguyên Liệu Chuẩn Bị
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>2 bắp ngô ngọt</li>
              <li>200ml sữa tươi không đường</li>
              <li>1 củ hành tây</li>
              <li>2 tép tỏi băm nhỏ</li>
              <li>500ml nước dùng gà (hoặc nước lọc)</li>
              <li>1 thìa bơ lạt</li>
              <li>1 quả trứng gà</li>
              <li>Muối, hạt tiêu, gia vị tùy chỉnh</li>
              <li>Hành lá, ngò rí để trang trí</li>
            </ul>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-orange-500 mt-4">
              Cách Chế Biến
            </h2>
            <h3 className="text-lg font-medium text-orange-400 mt-3">
              Bước 1: Sơ Chế Nguyên Liệu
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Ngô bóc vỏ, rửa sạch và tách hạt.</li>
              <li>Hành tây bóc vỏ, thái nhỏ.</li>
              <li>Tỏi băm nhuyễn.</li>
            </ul>

            <h3 className="text-lg font-medium text-orange-400 mt-3">
              Bước 2: Xào Nguyên Liệu
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Bắc nồi lên bếp, cho bơ vào đun nóng.</li>
              <li>
                Phi thơm hành tây và tỏi, sau đó cho ngô vào xào sơ trong 2-3
                phút.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-orange-400 mt-3">
              Bước 3: Nấu Súp
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Đổ nước dùng gà vào nồi, đun sôi rồi hạ nhỏ lửa.</li>
              <li>Nấu trong 15 phút cho ngô mềm.</li>
              <li>
                Dùng máy xay sinh tố xay nhuyễn một phần súp để tạo độ sánh mịn.
              </li>
              <li>
                Đánh tan trứng gà rồi đổ từ từ vào nồi, khuấy nhẹ để tạo sợi
                trứng.
              </li>
            </ul>
            <Image
              src={post.images[0]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-orange-400 mt-3">
              Bước 4: Hoàn Thiện Món Ăn
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Cho sữa tươi vào, khuấy đều.</li>
              <li>Nấu thêm 2 phút, nêm muối, hạt tiêu vừa ăn.</li>
            </ul>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-orange-500 mt-4">
              Thưởng Thức
            </h2>
            <p className="text-gray-700">
              Múc súp ra bát, rắc hành lá và ngò rí lên trên. Dùng nóng kèm bánh
              mì hoặc salad rau tươi.
            </p>

            <h2 className="text-xl font-semibold text-orange-500 mt-4">
              Lợi Ích Của Súp Ngô
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Giàu chất xơ và vitamin hỗ trợ tiêu hóa.</li>
              <li>Cung cấp năng lượng lành mạnh.</li>
              <li>Thích hợp cho cả trẻ nhỏ và người lớn.</li>
            </ul>

            <p className="mt-4 text-gray-700 font-medium">
              Hãy thử ngay công thức này để cả gia đình cùng thưởng thức bữa ăn
              ngon lành nhé!
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
