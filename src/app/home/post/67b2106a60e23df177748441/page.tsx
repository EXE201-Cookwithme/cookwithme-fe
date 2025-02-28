import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b2106a60e23df177748441";
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
            <h2 className="text-2xl font-bold text-orange-700 mb-4">
              Bông Lan Trứng Muối – Ai Nói Làm Bánh Khó? Thử Món Này Rồi Mới
              Biết! 🍰🥚
            </h2>
            <p className="text-gray-700 mb-4">
              Mình vừa thử làm bông lan trứng muối theo công thức trên website
              và thật sự không thể tin được kết quả! Mình vốn dĩ không phải là
              người giỏi trong việc làm bánh, nhưng công thức này dễ làm đến mức
              không tưởng.
            </p>
            <p className="text-gray-700 mb-4">
              Mọi thứ từ bột mì, trứng muối, sữa tươi, đều được hướng dẫn tỉ mỉ.
              Mình chỉ mất khoảng 30 phút chuẩn bị và hơn 1 tiếng để bánh nở
              vàng đều trong lò. Và khi bánh hoàn thành, mùi thơm ngào ngạt
              khiến cả nhà phải đứng chờ! Bông lan thì mềm mịn, xốp và đặc biệt,
              trứng muối bên trong béo ngậy, vừa mặn vừa ngọt, không hề bị ngấy
              đâu nhé!
            </p>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />

            <p className="text-gray-700 mb-4">
              Điều mình thích nhất là món này rất dễ làm mà lại rất “ngon đúng
              kiểu”, không cần phải đi đâu xa mới được ăn bông lan trứng muối
              ngon như ngoài tiệm. Thêm vào đó, bạn hoàn toàn có thể điều chỉnh
              độ mặn ngọt tùy theo khẩu vị của mình.
            </p>
            <p className="text-gray-700 mb-4">
              Chia sẻ nhỏ: Để bánh thêm phần hấp dẫn, mình thường thêm một chút
              nước sốt trứng muối lên trên, ăn kèm với trà nóng là tuyệt vời
              luôn!
            </p>
            <p className="text-gray-700 mb-4">
              Nếu bạn vẫn đang ngần ngại vì nghĩ làm bánh sẽ khó, thử công thức
              này đi, bạn sẽ không thất vọng đâu! Bánh ngon, dễ làm, lại còn cực
              kỳ đáng tự hào khi mang ra mời bạn bè, gia đình!
            </p>
            <p className="text-gray-700 font-semibold">
              Cảm ơn website vì công thức dễ hiểu này, mình chắc chắn sẽ làm lại
              nhiều lần nữa!
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
