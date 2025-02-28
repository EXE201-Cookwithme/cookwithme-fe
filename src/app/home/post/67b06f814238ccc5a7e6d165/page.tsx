import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b06f814238ccc5a7e6d165";
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
            <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
              Bangers and Mash (Anh) - Xúc Xích và Khoai Tây Nghiền
            </h1>
            <p className="text-gray-700 mb-4">
              Bangers and Mash là món ăn truyền thống của Anh, gồm xúc xích
              nướng hoặc chiên, ăn kèm với khoai tây nghiền và nước sốt hành tây
              đậm đà.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Nguyên liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>4 cây xúc xích heo (hoặc xúc xích tùy chọn)</li>
              <li>500g khoai tây</li>
              <li>50g bơ</li>
              <li>100ml sữa tươi</li>
              <li>1 củ hành tây, thái lát mỏng</li>
              <li>200ml nước dùng bò</li>
              <li>1 muỗng cà phê bột mì</li>
              <li>2 muỗng canh dầu ô liu</li>
              <li>Muối, tiêu</li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Cách làm
            </h2>
            <ol className="list-decimal list-inside text-gray-700">
              <li>
                <span className="font-bold">Luộc khoai tây</span>
                <p>
                  Gọt vỏ khoai tây, cắt miếng vừa ăn, luộc trong nước muối
                  khoảng 15-20 phút đến khi mềm.
                </p>
              </li>
              <Image
                src={post.images[1]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Làm khoai tây nghiền</span>
                <p>
                  Vớt khoai ra, nghiền nhuyễn cùng bơ, sữa, muối và tiêu đến khi
                  mịn.
                </p>
              </li>
              <Image
                src={post.images[2]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Chiên xúc xích</span>
                <p>
                  Làm nóng chảo với dầu ô liu, cho xúc xích vào chiên đến khi
                  vàng đều các mặt, khoảng 10-15 phút.
                </p>
              </li>
              <Image
                src={post.images[3]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Làm sốt hành tây</span>
                <p>
                  Dùng lại chảo vừa chiên xúc xích, thêm hành tây vào xào đến
                  khi mềm.
                </p>
                <p>
                  Thêm bột mì, đảo đều trong 1-2 phút, sau đó đổ nước dùng bò
                  vào, khuấy đều và nấu cho đến khi sốt sệt lại.
                </p>
              </li>
              <Image
                src={post.images[4]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <span className="font-bold">Hoàn thành</span>
                <p>
                  Bày khoai tây nghiền ra đĩa, đặt xúc xích lên trên và rưới
                  nước sốt hành tây.
                </p>
              </li>
            </ol>
            <p className="mt-4 text-gray-600 italic">
              📌 Mẹo nấu ngon: Dùng xúc xích chất lượng tốt để tăng hương vị.
              Thêm chút mù tạt vào khoai tây nghiền để tăng độ đậm đà. Nếu muốn
              nước sốt có độ sánh mịn hơn, có thể lọc qua rây.
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
