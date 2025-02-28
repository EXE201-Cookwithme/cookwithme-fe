import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b061fa4238ccc5a7e6d155";
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
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Công Thức Salad Trộn Sốt Mayonnaise Béo Ngọt, Thơm Ngon
            </h1>

            <p className="text-gray-700 mb-4">
              Salad trộn sốt mayonnaise là món ăn thanh mát, giàu dưỡng chất và
              dễ chế biến. Cùng tìm hiểu cách làm ngay tại nhà nhé!
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Nguyên Liệu Cần Chuẩn Bị
            </h2>
            <h3 className="font-semibold text-gray-700">Nguyên liệu chính:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>200g rau xà lách</li>
              <li>1 cà chua lớn</li>
              <li>1/2 quả dưa leo</li>
              <li>1/2 củ cà rốt</li>
              <li>100g bắp ngô ngọt</li>
              <li>1/2 quả táo</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />

            <h3 className="font-semibold text-gray-700 mt-2">
              Nguyên liệu phụ:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>100g tôm hoặc thịt gà luộc xé</li>
              <li>2 muỗng canh mayonnaise</li>
              <li>1 muỗng canh sữa chua không đường</li>
              <li>1/2 muỗng cà phê muối</li>
              <li>1/2 muỗng cà phê tiêu</li>
              <li>1 muỗng canh nước cốt chanh</li>
            </ul>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Cách Làm Salad Trộn Sốt Mayonnaise
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                <strong>Sơ Chế Nguyên Liệu:</strong> Rửa sạch rau xà lách, để
                ráo. Cà chua, dưa leo thái lát mỏng. Cà rốt bào sợi. Ngô ngọt
                luộc chín. Táo gọt vỏ, thái lát.
              </li>
              <li>
                <strong>Pha Nước Sốt:</strong> Trộn mayonnaise, sữa chua, muối,
                tiêu và nước cốt chanh. Khuấy đều cho đến khi hỗn hợp sánh mịn.
              </li>
              <li>
                <strong>Trộn Salad:</strong> Cho tất cả nguyên liệu vào bát lớn.
                Rưới nước sốt lên, trộn đều. Để trong tủ lạnh 15 phút trước khi
                dùng.
              </li>
            </ol>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Mẹo Nhỏ Giúp Salad Thêm Ngon
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Dùng mayonnaise kèm sữa chua giúp nước sốt thanh hơn.</li>
              <li>Chọn rau tươi và ngâm nước lạnh giúp giòn hơn.</li>
              <li>Thêm trứng luộc hoặc hạt điều rang để tăng vị béo.</li>
            </ul>
            <Image
              src={post.images[4]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />

            <p className="text-gray-700 mt-4">
              Chỉ với vài bước đơn giản, bạn đã có món salad trộn sốt mayonnaise
              béo ngọt, thanh mát cho bữa ăn. Chúc bạn thành công! 🎉
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
