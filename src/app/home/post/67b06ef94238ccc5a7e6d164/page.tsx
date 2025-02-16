import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b06ef94238ccc5a7e6d164";
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
            <h1 className="text-2xl font-bold text-center text-red-500 mb-4">
              Paella (Tây Ban Nha) - Cơm Hải Sản Tây Ban Nha
            </h1>
            <p className="text-gray-700 mb-4">
              Paella là món cơm nổi tiếng của Tây Ban Nha, thường được chế biến
              với hải sản, thịt gà hoặc rau củ, kết hợp với nghệ tây để tạo màu
              vàng đặc trưng.
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Nguyên liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>500gr gạo</li>
              <li>150gr thịt heo</li>
              <li>6 con tôm to</li>
              <li>450gr thịt gà</li>
              <li>200gr đậu ve xanh</li>
              <li>200ml dầu oliu</li>
              <li>1 muỗng canh ớt bột</li>
              <li>8 muỗng canh cà chua</li>
              <li>Nghệ tây</li>
              <li>¾ chén đậu Hà Lan</li>
              <li>15 con ngao</li>
              <li>1 trái ớt chuông đỏ</li>
              <li>Gia vị: muối, tiêu, ớt bột</li>
            </ul>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Các bước thực hiện
            </h2>
            <ol className="list-decimal list-inside text-gray-700">
              <li>
                <span className="font-bold">Sơ chế nguyên liệu</span>
                <p>Rửa sạch và sơ chế thịt, hải sản, rau củ.</p>
              </li>
              <li className="flex flex-col gap-3 mb-3">
                <span className="font-bold">Chế biến thịt, hải sản</span>
                <p>
                  – Ngao và thịt gà, bắc lên bếp, luộc chín lấy nước nấu cơm.
                </p>
                <p>
                  – Cho dầu oliu vào chảo đun nóng sau đó lấy tôm xào khoảng 2-3
                  phút thì vớt tôm ra đĩa.
                </p>
                <p>
                  – Sau khi xào tôm thì bạn đổ tiếp phần thịt gà, thịt heo vào
                  xào khoảng 4-5 phút thì lấy thịt vào xào đến khi săn lại thì
                  thêm ớt chuông xào sơ thì tắt bếp, cho ớt và thịt lên đĩa.
                </p>
              </li>
              <li className="mb-3">
                <span className="font-bold">Nấu cơm Paella</span>
                <p>
                  Món ăn Tây Ban Nha này không quá khó nấu. Bạn bắc bếp lên một
                  chảo khác, cho dầu oliu vào đun nóng rồi cho đậu Hà Lan và đậu
                  ve xanh vào xào 2-3 phút, cà chua cho vào nghiền nhỏ rồi trộn
                  các nguyên liệu cho đều. Bây giờ bạn nêm thêm ớt bột vừa phải.
                  Tiếp tục thêm thịt vừa xào vào đảo đều, cho thêm 1,5 nước luộc
                  gà và ngao cùng với nghệ, nêm gia vị cho đậm đà.
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
                <span className="font-bold">Thưởng thức</span>
                <p>Trang trí và thưởng thức món Paella ngon đúng điệu.</p>
              </li>
            </ol>
            <p className="mt-4 text-gray-600 italic">
              📌 Mẹo nấu ngon: Không khuấy cơm trong quá trình nấu để tạo lớp
              cháy giòn đặc trưng dưới đáy chảo. Dùng nước dùng hải sản tự nấu
              giúp tăng hương vị.
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
