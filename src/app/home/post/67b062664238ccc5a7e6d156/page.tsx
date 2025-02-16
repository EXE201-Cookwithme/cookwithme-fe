import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b062664238ccc5a7e6d156";
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
            <h1 className="text-2xl font-bold text-yellow-600 mb-4">
              Công Thức Khoai Tây Nghiền Béo Mịn, Thơm Ngon 🥔
            </h1>

            <p className="text-gray-700 mb-4">
              Khoai tây nghiền là món ăn béo mịn, thơm ngon, dễ chế biến và phù
              hợp với nhiều bữa ăn. Cùng khám phá cách làm ngay tại nhà nhé!
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Nguyên Liệu Cần Chuẩn Bị
            </h2>
            <h3 className="font-semibold text-gray-700">Nguyên liệu chính:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>500g khoai tây</li>
              <li>50ml sữa tươi không đường</li>
              <li>30g bơ lạt</li>
              <li>1/2 muỗng cà phê muối</li>
              <li>1/4 muỗng cà phê tiêu</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="font-semibold text-gray-700 mt-2">
              Nguyên liệu phụ (tùy chọn):
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>50g phô mai bào</li>
              <li>1 muỗng canh kem tươi (whipping cream)</li>
              <li>Hành lá băm nhỏ hoặc rau mùi để trang trí</li>
            </ul>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Cách Làm Khoai Tây Nghiền
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                <strong>Sơ Chế Khoai Tây:</strong> Khoai tây gọt vỏ, rửa sạch và
                cắt miếng vừa. Luộc khoai với muối trong 15-20 phút đến khi chín
                mềm, rồi vớt ra để ráo.
              </li>
              <li>
                <strong>Nghiền Khoai:</strong> Khi khoai còn nóng, dùng dụng cụ
                nghiền hoặc dĩa để nghiền nhuyễn. Thêm bơ lạt vào khoai để bơ
                tan chảy.
              </li>
              <li>
                <strong>Trộn Nguyên Liệu:</strong> Thêm sữa tươi từ từ, trộn đều
                đến khi đạt độ sánh mịn mong muốn. Có thể thêm kem tươi hoặc phô
                mai nếu thích vị béo hơn.
              </li>
              <li>
                <strong>Hoàn Thành & Thưởng Thức:</strong> Cho khoai tây nghiền
                ra đĩa, rắc hành lá hoặc rau mùi lên trên. Dùng nóng kèm với
                thịt nướng, gà quay hoặc cá hồi áp chảo.
              </li>
            </ol>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Mẹo Nhỏ Giúp Khoai Tây Nghiền Ngon Hơn
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Dùng khoai tây bột (loại vỏ vàng) giúp món ăn mịn và dẻo hơn.
              </li>
              <li>Không nên dùng máy xay vì có thể làm khoai bị dai.</li>
              <li>Có thể thay sữa tươi bằng nước hầm gà để tăng hương vị.</li>
            </ul>
            <Image
              src={post.images[4]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <p className="text-gray-700 mt-4">
              Chỉ với vài bước đơn giản, bạn đã có món khoai tây nghiền béo mịn,
              thơm ngon để thưởng thức. Chúc bạn thành công! 🎉
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
