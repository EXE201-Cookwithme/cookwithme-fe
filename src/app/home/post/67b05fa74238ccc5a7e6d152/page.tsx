import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b05fa74238ccc5a7e6d152";
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
              Snack Apple Chips – Táo Sấy Giòn Ngọt Tự Nhiên 🍏
            </h1>
            <p className="mt-2 text-gray-700">
              Snack apple chips (táo sấy giòn) là món ăn vặt nổi tiếng ở các
              nước phương Tây, vừa healthy vừa giữ được vị ngọt tự nhiên của
              trái cây.
            </p>

            <h2 className="text-xl font-semibold text-red-500 mt-4">
              🍏 Nguyên Liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>2-3 quả táo (loại táo giòn, ngọt)</li>
              <li>1/2 thìa cà phê bột quế (tùy chọn)</li>
              <li>1 thìa cà phê nước cốt chanh</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-red-500 mt-4">
              🧑‍🍳 Cách Làm Apple Chips
            </h2>

            <h3 className="text-lg font-medium text-red-400 mt-3">
              Bước 1: Sơ Chế Táo
            </h3>
            <p className="text-gray-700">
              Rửa sạch táo, thái lát mỏng khoảng 2mm. Nếu muốn giữ nguyên vỏ,
              nên chọn táo hữu cơ.
            </p>

            <h3 className="text-lg font-medium text-red-400 mt-3">
              Bước 2: Phủ Gia Vị
            </h3>
            <p className="text-gray-700">
              Xếp táo lên khay nướng, quét một lớp nước cốt chanh mỏng lên bề
              mặt để giữ màu đẹp. Rắc nhẹ bột quế nếu thích.
            </p>

            <h3 className="text-lg font-medium text-red-400 mt-3">
              Bước 3: Sấy Giòn
            </h3>
            <p className="text-gray-700">
              Nướng ở 100°C trong 2-3 giờ. Khi táo khô và giòn, tắt lò, để nguội
              tự nhiên trong lò thêm 30 phút để giòn hoàn toàn.
            </p>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-red-400 mt-3">
              Bước 4: Thưởng Thức
            </h3>
            <p className="text-gray-700">
              Snack táo sấy giòn rụm, có vị ngọt tự nhiên, thích hợp cho cả trẻ
              em và người lớn.
            </p>

            <p className="italic text-gray-600 mt-3">
              💡 <strong>Mẹo nhỏ:</strong> Có thể thay táo bằng lê hoặc chuối để
              thử các phiên bản khác nhau!
            </p>

            <h2 className="text-xl font-semibold text-red-500 mt-4">
              ✨ Kết Luận
            </h2>
            <p className="text-gray-700">
              Hai món snack này không chỉ ngon mà còn tốt cho sức khỏe, phù hợp
              cho cả người ăn kiêng và yêu thích đồ ăn tự nhiên. Hãy thử ngay và
              chia sẻ cảm nhận của bạn nhé! 🌿✨
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
