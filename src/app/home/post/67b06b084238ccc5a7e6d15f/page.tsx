import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b06b084238ccc5a7e6d15f";
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
            <h1 className="text-2xl font-bold text-gray-800">
              SASHIMI CÁ HỒI (NHẬT BẢN 🇯🇵) 🍣
            </h1>
            <p className="mt-4">
              Sushi cá hồi là một món ăn tinh tế của Nhật Bản, kết hợp giữa cơm
              trộn giấm và cá hồi tươi sống. Đây là một món ăn thanh đạm nhưng
              đầy đủ dinh dưỡng, thường được phục vụ kèm với wasabi và nước
              tương.
            </p>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-red-600">
                Nguyên liệu làm Sashimi cá hồi:
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>100g cá hồi tươi</li>
                <li>1 nhánh tía tô</li>
                <li>200g củ cải trắng bào mỏng</li>
                <li>20g gừng hồng (làm sẵn)</li>
                <li>1 muỗng canh nước tương</li>
                <li>1 muỗng canh wasabi</li>
              </ul>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-green-600">
                Cách chọn mua phi lê cá hồi tươi ngon:
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Thịt cá hồi tươi phải có màu hồng tươi hoặc cam.</li>
                <li>
                  Thịt cá có độ đàn hồi tốt, khi ấn tay vào không để lại vết
                  lõm.
                </li>
                <li>Bề mặt miếng thịt khô ráo, không chảy dịch lạ.</li>
                <li>
                  Các vân mỡ trên mình cá đều màu, không bị sỉn màu hay có đốm
                  nâu.
                </li>
                <li>Có mùi thơm đặc trưng, không có mùi lạ hay bị hắc.</li>
              </ul>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-blue-600">
                Cách chế biến Sashimi cá hồi:
              </h2>
              <ul className="list-decimal list-inside mt-2 space-y-2">
                <li>
                  <span className="font-bold">Sơ chế cá hồi:</span> Rửa nhẹ
                  nhàng cá hồi dưới vòi nước sạch, lau khô bằng giấy ăn hoặc
                  khăn sạch.
                </li>
                <Image
                  src={post.images[1]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <li>
                  <span className="font-bold">Cắt cá hồi:</span> Dùng dao sắc
                  cắt cá thành lát vừa ăn (rộng 2.5 cm, dài 4 cm, dày 0.5 cm).
                </li>
                <Image
                  src={post.images[2]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <li>
                  <span className="font-bold">
                    Sơ chế các nguyên liệu khác:
                  </span>{" "}
                  Gọt vỏ củ cải, rửa sạch rồi bào sợi. Rửa sạch tía tô và để ráo
                  nước.
                </li>
                <Image
                  src={post.images[3]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <li>
                  <span className="font-bold">Hoàn thành:</span> Xếp cá lên đĩa
                  theo sở thích, thêm tía tô, củ cải và nước chấm.
                </li>
                <Image
                  src={post.images[4]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
              </ul>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-purple-600">
                Thành phẩm:
              </h2>
              <p className="mt-2">
                Sashimi cá hồi là món ăn nổi tiếng với hương vị tinh tế. Thịt cá
                mềm thơm, giữ được độ ngọt tự nhiên, kết hợp với nước tương và
                wasabi tạo nên hương vị hấp dẫn.
              </p>
            </div>
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
