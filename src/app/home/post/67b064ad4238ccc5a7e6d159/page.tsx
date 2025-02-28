import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b064ad4238ccc5a7e6d159";
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
            <h1 className="text-2xl font-bold text-yellow-700 mb-4">
              🍌 Biến Chuối Chín Thành Siêu Phẩm! 🔥
            </h1>

            <p className="text-gray-700 mb-4">
              Bạn có những quả chuối chín mà chưa biết làm gì? Hãy tận dụng ngay
              để làm Banana Cake – bánh chuối thơm lừng, mềm mịn và cực kỳ hấp
              dẫn. Không cần kỹ thuật phức tạp, chỉ với vài nguyên liệu đơn
              giản, bạn đã có ngay một chiếc bánh hoàn hảo cho bữa sáng hoặc trà
              chiều!
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Nguyên Liệu Cần Chuẩn Bị
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>3 quả chuối chín</li>
              <li>2 quả trứng gà</li>
              <li>100g đường nâu</li>
              <li>100g bơ lạt (đun chảy)</li>
              <li>180g bột mì đa dụng</li>
              <li>1 thìa cà phê bột nở (baking powder)</li>
              <li>1/2 thìa cà phê muối</li>
              <li>1 thìa cà phê tinh chất vani</li>
              <li>50ml sữa tươi không đường</li>
              <li>50g hạnh nhân hoặc socola chip (tùy chọn)</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Cách Làm Bánh Chuối
            </h2>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                <strong>Làm nóng lò & chuẩn bị khuôn:</strong>
                Làm nóng lò ở 170°C. Lót giấy nến hoặc phết bơ vào khuôn chống
                dính.
              </li>
              <li>
                <strong>Nghiền chuối:</strong>
                Dùng nĩa nghiền nhuyễn chuối trong tô lớn. Nếu thích ăn chuối
                còn lợn cợn, chỉ cần nghiền sơ.
              </li>
              <li>
                <strong>Trộn nguyên liệu ướt:</strong>
                Thêm trứng, bơ đun chảy, đường nâu, sữa tươi, vani vào tô chuối.
                Khuấy đều đến khi hòa quyện.
              </li>
              <li>
                <strong>Trộn nguyên liệu khô:</strong>
                Rây bột mì, bột nở, muối vào hỗn hợp chuối. Trộn nhẹ nhàng bằng
                spatula theo kỹ thuật fold.
              </li>
              <li>
                <strong>Thêm topping (tùy chọn):</strong>
                Cho hạnh nhân hoặc socola chip vào hỗn hợp, trộn đều.
              </li>
              <li>
                <strong>Nướng bánh:</strong>
                Đổ hỗn hợp vào khuôn, dàn đều mặt và nướng 40-45 phút. Kiểm tra
                bằng tăm, nếu sạch là bánh chín.
              </li>
              <li>
                <strong>Thưởng thức:</strong>
                Để bánh nguội bớt, cắt miếng và dùng kèm mật ong hoặc kem tươi.
              </li>
            </ol>

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Mẹo Nhỏ Khi Làm Bánh Chuối
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Dùng chuối chín rục giúp bánh ngọt tự nhiên và thơm hơn.</li>
              <li>Không trộn bột quá lâu để bánh không bị chai cứng.</li>
              <li>
                Để bánh nguội khoảng 15 phút sau khi nướng giúp kết cấu ổn định
                hơn.
              </li>
            </ul>

            <p className="text-gray-700 mt-4">
              Bạn đã sẵn sàng thử làm bánh chuối chưa? Hãy vào bếp và chia sẻ
              thành phẩm của bạn nhé! 🍌✨
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
