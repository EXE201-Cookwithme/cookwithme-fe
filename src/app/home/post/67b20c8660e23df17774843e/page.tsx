import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b20c8660e23df17774843e";
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
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Trà Hoa Đậu Biếc Chanh 🌸🍋
            </h2>
            <p className="text-gray-700 mb-4">
              Trà hoa đậu biếc chanh có màu xanh tím đẹp mắt, khi thêm chanh sẽ
              chuyển sang màu tím hồng, tạo nên thức uống hấp dẫn và giàu chất
              chống oxy hóa.
            </p>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Nguyên Liệu
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>40g trà nhài</li>
              <li>20g hoa đậu biếc khô</li>
              <li>180ml nước ấm</li>
              <li>20ml nước đường</li>
              <li>200ml Topping Cream</li>
              <li>200ml Whipping Cream</li>
              <li>20g bột nền vanilla</li>
              <li>1g muối mịn</li>
              <li>Đá viên</li>
            </ul>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Cách Làm
            </h3>
            <h4 className="text-lg font-medium text-blue-700 mb-1">
              Bước 1: Pha Trà Hoa Đậu Biếc
            </h4>
            <p className="text-gray-700 mb-4">
              Rửa trà nhài và hoa đậu biếc bằng nước ấm để loại bỏ tạp chất. Sau
              đó, cho vào bình thủy tinh lớn, ủ với 180ml nước sôi (95°C) trong
              15 – 20 phút. Lọc qua rây để lấy nước cốt màu xanh tím đẹp mắt.
            </p>
            <h4 className="text-lg font-medium text-blue-700 mb-1">
              Bước 2: Làm Lớp Macchiato
            </h4>
            <p className="text-gray-700 mb-4">
              Đánh bông nhẹ Topping Cream, Whipping Cream, bột nền vanilla và
              muối bằng máy đánh trứng ở tốc độ vừa phải cho đến khi sánh mịn.
            </p>
            <Image
              src={post.images[0]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h4 className="text-lg font-medium text-blue-700 mb-1">
              Bước 3: Hoàn Thành
            </h4>
            <p className="text-gray-700 mb-4">
              Cho nước trà hoa đậu biếc, nước đường và đá viên vào ly. Khuấy
              đều, sau đó nhẹ nhàng rót lớp macchiato lên trên. Trang trí với
              hoa đậu biếc khô nếu thích.
            </p>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Mẹo Nhỏ
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>
                Sử dụng trà nhài để giữ hương vị nhẹ nhàng, tránh trà đen vì có
                màu và mùi đậm.
              </li>
              <li>Rửa trà trước khi ủ giúp nước trà trong và đẹp hơn.</li>
              <li>
                Dùng nước ấm 80 – 90°C để pha trà, không đun sôi trực tiếp trên
                bếp.
              </li>
            </ul>
            <p className="text-gray-700 font-semibold">
              Trà hoa đậu biếc chanh không chỉ đẹp mắt mà còn tốt cho sức khỏe.
              Hãy thử ngay hôm nay! 🍵✨
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
