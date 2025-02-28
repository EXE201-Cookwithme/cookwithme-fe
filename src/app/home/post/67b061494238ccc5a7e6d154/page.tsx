import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b061494238ccc5a7e6d154";
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
              Bí Quyết Làm Dưa Chua Giòn Ngon, Hấp Dẫn Tại Nhà
            </h1>

            <p className="text-gray-700 mb-4">
              Dưa chua là món ăn kèm giàu hương vị, giúp tăng khẩu vị và hỗ trợ
              tiêu hóa. Hãy cùng tham khảo cách làm dưa chua ngon ngay tại nhà!
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Nguyên Liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>1 kg dưa cải</li>
              <li>60g muối</li>
              <li>20g đường</li>
              <li>5 củ hành tím</li>
              <li>100g hành lá</li>
              <li>5 trái ớt</li>
              <li>3 muỗng cà phê giấm</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Cách Làm Dưa Chua
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                <strong>Sơ Chế Nguyên Liệu:</strong> Tách bẹ dưa cải, loại bỏ lá
                hư, phơi nắng 1 ngày cho hơi héo. Rửa sạch, cắt khúc vừa ăn, để
                ráo nước. Hành tím bóc vỏ, hành lá cắt khúc 5cm.
              </li>
              <li>
                <strong>Muối Dưa:</strong> Pha 60g muối, 20g đường, 3 muỗng giấm
                vào 1 lít nước ấm (~60°C). Xếp dưa vào hũ, đổ nước muối, thêm
                hành tím, hành lá, ớt. Dùng que tre nén dưa ngập nước, đậy kín
                nắp, để nơi thoáng mát 2-3 ngày.
              </li>
              <li>
                <strong>Thành Phẩm:</strong> Khi dưa chuyển màu vàng là đã chua
                ngon, có thể dùng ngay. Thích hợp ăn kèm bánh chưng, bánh tét
                dịp Tết!
              </li>
            </ol>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Mẹo Nhỏ Khi Làm Dưa Chua
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Chọn rau tươi ngon, không dập.</li>
              <li>Rửa sạch và để ráo nước trước khi muối.</li>
              <li>Bảo quản trong tủ lạnh sau khi lên men để giữ vị ngon.</li>
            </ul>

            <p className="text-gray-700 mt-4">
              Với cách làm này, bạn dễ dàng chế biến món dưa chua giòn ngon tại
              nhà. Chúc bạn thành công! 🎉
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
