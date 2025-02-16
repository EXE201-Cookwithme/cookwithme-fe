import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b0641c4238ccc5a7e6d158";
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
    toast.error("Error fetching post by id");
  }
};
const Page = async () => {
  const post = await fetchPostById();
  const auth: User | null = await currentUser();
  return (
    <section className="w-[70%] mx-auto py-8 mt-5">
      <div className="flex flex-col gap-5 p-5 text-center mb-7">
        <h1 className="lg:text-5xl text-3xl font-bold">{post.title}</h1>
        <div className="text-sm font-semibold">
          <Badge>{post.categoryId.name}</Badge>
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
            <h1 className="text-2xl font-bold text-brown-700 mb-4">
              🍫 Chocolate Brownie Siêu Mềm Ẩm, Đậm Vị Socola! 🔥
            </h1>

            <p className="text-gray-700 mb-4">
              Nếu bạn là một tín đồ của socola, chắc chắn bạn không thể bỏ qua
              món Brownie – lớp vỏ hơi giòn nhưng bên trong mềm ẩm, đậm vị
              cacao. Cùng vào bếp thực hiện ngay công thức này nhé!
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Nguyên Liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>200g socola đen (ít nhất 55% cacao)</li>
              <li>120g bơ lạt</li>
              <li>150g đường trắng</li>
              <li>50g đường nâu</li>
              <li>2 quả trứng gà</li>
              <li>1 thìa cà phê tinh chất vani</li>
              <li>80g bột mì đa dụng</li>
              <li>20g bột cacao nguyên chất</li>
              <li>1/2 thìa cà phê muối</li>
              <li>1/2 thìa cà phê bột nở</li>
              <li>50g hạnh nhân hoặc óc chó băm nhỏ (tùy chọn)</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Cách Làm
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                <strong>Làm nóng lò & chuẩn bị khuôn:</strong>
                Làm nóng lò nướng ở 170°C. Lót giấy nến vào khuôn 20x20 cm.
              </li>
              <li>
                <strong>Làm tan chảy socola & bơ:</strong>
                Đun cách thủy hoặc quay lò vi sóng cho đến khi tan chảy, khuấy
                đều.
              </li>
              <Image
                src={post.images[2]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <strong>Đánh trứng & đường:</strong>
                Đánh trứng, đường trắng, đường nâu và vani đến khi hỗn hợp sáng
                màu.
              </li>
              <Image
                src={post.images[3]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <strong>Trộn socola vào trứng:</strong>
                Đổ từ từ socola tan chảy vào trứng, khuấy nhẹ nhàng.
              </li>
              <Image
                src={post.images[4]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <strong>Trộn bột:</strong>
                Rây bột mì, bột cacao, muối, bột nở vào, trộn đều bằng spatula.
              </li>
              <li>
                <strong>Thêm hạt & nướng:</strong>
                Cho hạnh nhân hoặc óc chó vào, dàn đều hỗn hợp trong khuôn,
                nướng 25-30 phút.
              </li>
              <Image
                src={post.images[5]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <strong>Kiểm tra bánh:</strong>
                Xiên tăm vào bánh, nếu có ít vụn dính nhưng không ướt là chín.
              </li>
              <li>
                <strong>Để nguội & thưởng thức:</strong>
                Cắt bánh thành miếng vuông, có thể dùng kèm kem vani.
              </li>
            </ol>
            <Image
              src={post.images[6]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Mẹo Nhỏ Khi Làm Brownie
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Không đánh trứng quá mạnh để bánh không bị bông xốp.</li>
              <li>Dùng đường nâu giúp bánh mềm ẩm hơn.</li>
              <li>Không nướng quá lâu để giữ được độ ẩm bên trong bánh.</li>
            </ul>

            <p className="text-gray-700 mt-4">
              Bạn đã sẵn sàng vào bếp thử làm Chocolate Brownie chưa? Đừng quên
              chia sẻ thành phẩm của bạn nhé! 🍫🍰
            </p>
          </div>
          <div className="py-7 flex flex-col gap-8">
            <Comment postId={post._id} clerkId={auth?.id} />
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
