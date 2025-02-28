import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b20e6760e23df177748440";
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
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Khám Phá Bí Quyết Làm Kim Chi Ngon Như Nhà Hàn Quốc – Cực Dễ! 🌶️💯
            </h2>
            <p className="text-gray-700 mb-4">
              Lần đầu tiên tự tay làm kim chi và không thể tin vào kết quả! Mình
              đã làm theo công thức trên website và giờ có thể tự hào với món
              kim chi chuẩn Hàn Quốc ngay tại nhà. 🍚🥢
            </p>
            <p className="text-gray-700 mb-4">
              Điều đầu tiên mình yêu thích là công thức siêu dễ làm. Từng bước
              hướng dẫn chi tiết giúp mình tự tin từ việc chuẩn bị nguyên liệu
              đến cách trộn gia vị. Cải thảo giòn, tỏi, gừng, và ớt bột đều hòa
              quyện tạo nên hương vị cay nồng mà không quá gắt, hoàn hảo cho bữa
              ăn.
            </p>
            <p className="text-gray-700 mb-4">
              Và đỉnh nhất chính là độ giòn tan của cải thảo và vị chua cay
              tuyệt vời khi lên men! Mình không thể ngừng ăn, món này cực kỳ gây
              nghiện. Mình để kim chi trong tủ lạnh vài ngày và sau đó thưởng
              thức, mỗi lần ăn đều cảm thấy như đang ăn kim chi thật sự từ một
              quán Hàn Quốc chính hiệu! 😋
            </p>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <p className="text-gray-700 mb-4">
              Làm kim chi không hề khó, chỉ cần một chút thời gian và công thức
              chuẩn – bạn cũng có thể biến tủ lạnh thành kho lưu trữ kim chi
              “cực phẩm” này. 🎉
            </p>
            <p className="text-gray-700 mb-4">
              👉 <span className="font-semibold">Lời khuyên:</span> Nếu bạn
              thích ăn cay, hãy thêm một chút gochugaru và gia vị theo sở thích!
              Kim chi vừa ngon vừa cực kỳ bổ dưỡng, là món ăn kèm không thể
              thiếu trong mỗi bữa cơm.
            </p>
            <p className="text-gray-700 font-semibold">
              Cảm ơn website vì công thức tuyệt vời này! Mình đã có kim chi ngon
              như ngoài hàng rồi! Bạn còn chần chừ gì mà không thử ngay? 😎
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
