import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b06bd24238ccc5a7e6d160";
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
              PAD THAI (THÁI LAN 🇹🇭) 🍤
            </h1>
            <p className="text-gray-700 mb-4">
              Pad Thai là món phở xào nổi tiếng của Thái Lan với hương vị cân
              bằng giữa chua, cay, mặn, ngọt. Đây là một trong những món ăn
              đường phố phổ biến nhất tại Thái Lan.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Nguyên liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>200g bánh phở</li>
              <li>100g tôm tươi</li>
              <li>150g đậu hũ</li>
              <li>1 quả trứng gà</li>
              <li>100g giá đỗ</li>
              <li>50g hẹ</li>
              <li>50g lạc rang</li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">Gia vị</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>2 muỗng canh nước mắm</li>
              <li>2 muỗng canh đường thốt nốt</li>
              <li>1 muỗng canh nước me</li>
              <li>1 muỗng canh tương ớt</li>
              <li>1 muỗng cà phê bột ớt</li>
              <li>1/2 muỗng cà phê muối</li>
              <li>1/4 muỗng cà phê tiêu</li>
              <li>2 muỗng canh dầu ăn</li>
              <li>1 muỗng canh tỏi băm</li>
              <li>1 muỗng canh hành tím băm</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Cách chế biến
            </h2>
            <ol className="list-decimal list-inside text-gray-700">
              <li className="flex flex-col gap-3 mb-4">
                <span className="font-bold">Bước 1: Sơ chế nguyên liệu</span>
                <p>
                  Cho bánh phở vào tô nước nóng, ngâm cho mềm. Sau đó, vớt ra để
                  ráo nước. Bước này giúp bánh phở dai ngon và thấm gia vị tốt
                  hơn khi xào.
                </p>
                <p>
                  Rửa sạch tôm, bóc vỏ, bỏ đầu nhưng giữ nguyên đuôi. Ướp tôm
                  với 1 muỗng cà phê hạt nêm và 1/2 muỗng cà phê tiêu trong 10
                  phút để tôm thấm gia vị.
                </p>
                <p>
                  Cắt đậu hũ thành những miếng vừa ăn, có thể cắt hình vuông,
                  hình tam giác hoặc hình chữ nhật. Rửa sạch giá đỗ và hẹ. Cắt
                  bỏ gốc giá đỗ và cắt hẹ thành những khúc vừa ăn. Rang lạc cho
                  đến khi chín vàng, giòn. Sau đó, giã lạc nhuyễn để trang trí
                  cho món Pad Thái.
                </p>
                <p>
                  Tiếp theo là trộn nước sốt. Đầu tiên cho tất cả các nguyên
                  liệu đã chuẩn bị vào một chén lớn.
                </p>
                <p>
                  Dùng muỗng khuấy đều cho đến khi đường thốt nốt tan hoàn toàn
                  và hỗn hợp hòa quyện thành một loại nước sốt sệt, mịn. Nếm thử
                  nước sốt để điều chỉnh gia vị cho phù hợp với khẩu vị.{" "}
                </p>
              </li>
              <li className="flex flex-col gap-3 mb-4">
                <span className="font-bold">Bước 2: Xào Pad Thái</span>
                <p>
                  Bật bếp với lửa lớn làm nóng chảo, sau đó cho 1 muỗng canh dầu
                  ăn vào, đợi dầu thơm ta phi thơm tỏi băm và hành tím băm. Tiếp
                  đến cho tôm vào xào chín, rồi cho tiếp đậu hũ vào xào cùng.
                  Cho bánh phở và nước sốt vào đảo nhanh tay cho đến khi bánh
                  phở thấm đều gia vị.
                </p>
                <p>
                  Nhanh tay đập trứng gà vào chảo, đảo đều cho trứng quyện vào
                  bánh phở. Cho thêm giá đỗ và hẹ vào xào nhanh. Cuối cùng là
                  tắt bếp và cho lạc rang và hành lá cắt nhỏ vào trộn đều.
                </p>
              </li>
              <li className="flex flex-col gap-3 mb-4">
                <span className="font-bold">Bước 3: Thưởng thức</span>
                <p>
                  Cho Pad Thái ra đĩa, rắc thêm lạc rang và chanh ớt để trang
                  trí. Để tăng thêm hương vị cho món ăn, bạn có thể ăn kèm với
                  rau sống tươi ngon. Rau sống sẽ giúp cân bằng vị giác, giảm
                  bớt cảm giác ngán và giúp món ăn thêm phần thanh mát.{" "}
                </p>
              </li>
            </ol>
            <p className="mt-4 text-gray-600 italic">
              📌 Mẹo nhỏ: Dùng nước me nguyên chất giúp Pad Thai có vị chua nhẹ
              đặc trưng.
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
