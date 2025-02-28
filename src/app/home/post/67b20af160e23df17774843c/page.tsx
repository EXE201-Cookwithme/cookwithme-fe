import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b20af160e23df17774843c";
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
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Matcha Latte (Nóng/Lạnh) – Hương Vị Tinh Tế 🍵
            </h2>
            <p className="text-gray-700 mb-4">
              Matcha Latte là sự kết hợp giữa bột trà xanh matcha nguyên chất và
              sữa tươi mịn màng, tạo nên một ly đồ uống thanh mát, thơm ngon.
              Đây là lựa chọn tuyệt vời cho những ai yêu thích vị trà xanh tự
              nhiên.
            </p>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Nguyên Liệu (1 Ly)
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>5g bột matcha nguyên chất</li>
              <li>30ml nước nóng (70°C)</li>
              <li>150ml sữa tươi không đường</li>
              <li>15ml mật ong hoặc syrup đường</li>
              <li>Đá viên (nếu uống lạnh)</li>
            </ul>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Cách Làm
            </h3>
            <h4 className="text-lg font-medium text-green-700 mb-1">
              Bước 1: Đánh Bột Matcha
            </h4>
            <p className="text-gray-700 mb-4">
              Cho bột matcha vào 30ml nước nóng, khuấy đều bằng chổi đánh matcha
              hoặc máy đánh bọt sữa.
            </p>
            <h4 className="text-lg font-medium text-green-700 mb-1">
              Bước 2: Pha Latte
            </h4>
            <p className="text-gray-700 mb-4">
              <strong>Đối với Matcha Latte nóng:</strong> Hâm nóng sữa, sau đó
              đổ vào matcha.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Đối với Matcha Latte lạnh:</strong> Đổ sữa vào ly đá, sau
              đó thêm matcha lên trên để tạo lớp đẹp mắt.
            </p>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Mẹo Nhỏ
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>
                Nếu thích béo hơn, bạn có thể thêm một chút sữa đặc hoặc kem
                tươi.
              </li>
              <li>
                Sử dụng sữa hạnh nhân hoặc sữa yến mạch để có hương vị đặc biệt
                hơn.
              </li>
              <li>
                Đánh matcha thật kỹ để tránh bị vón cục và có kết cấu mịn hơn.
              </li>
            </ul>
            <p className="text-gray-700 font-semibold">
              Matcha Latte không chỉ ngon miệng mà còn giúp tỉnh táo và tốt cho
              sức khỏe. Hãy thử ngay hôm nay! 🍵💚
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
