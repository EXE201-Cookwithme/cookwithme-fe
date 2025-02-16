import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b062ea4238ccc5a7e6d157";
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
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Công Thức Salad Cá Ngừ Thanh Mát, Dễ Làm 🥗
            </h1>

            <p className="text-gray-700 mb-4">
              Salad cá ngừ là món ăn giàu dinh dưỡng, thanh mát và dễ chế biến.
              Với sự kết hợp của rau xanh, cá ngừ và sốt chua béo, món ăn này
              không chỉ ngon miệng mà còn tốt cho sức khỏe.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Nguyên Liệu Cần Chuẩn Bị
            </h2>
            <h3 className="font-semibold text-gray-700">Nguyên liệu chính:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>1 lon cá ngừ ngâm dầu hoặc ngâm nước</li>
              <li>200g rau xà lách (hoặc rau diếp)</li>
              <li>10 quả cà chua bi</li>
              <li>1/2 củ hành tây</li>
              <li>1/2 quả dưa leo</li>
              <li>1 quả trứng gà luộc</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="font-semibold text-gray-700 mt-2">
              Nguyên liệu làm sốt:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>3 muỗng canh sốt mayonnaise</li>
              <li>1 muỗng cà phê nước cốt chanh</li>
              <li>1/2 muỗng cà phê muối</li>
              <li>1/4 muỗng cà phê tiêu</li>
              <li>1/2 muỗng cà phê mật ong (tùy chọn)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Cách Làm Salad Cá Ngừ
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                <strong>Sơ Chế Nguyên Liệu:</strong> Rửa sạch rau xà lách, cà
                chua, dưa leo và để ráo nước. Hành tây thái lát mỏng, ngâm nước
                đá để giảm độ hăng. Cà chua bi cắt đôi, dưa leo thái lát, trứng
                gà luộc chín rồi cắt miếng vừa ăn.
              </li>
              <li>
                <strong>Trộn Sốt Salad:</strong> Trộn sốt mayonnaise, nước cốt
                chanh, muối, tiêu và mật ong trong một bát nhỏ. Khuấy đều đến
                khi hỗn hợp hòa quyện, tạo độ sánh mịn.
              </li>
              <li>
                <strong>Trộn Salad:</strong> Cho rau xà lách, dưa leo, cà chua
                và hành tây vào tô lớn. Thêm cá ngừ đã để ráo dầu. Rưới sốt lên
                trên, nhẹ nhàng trộn đều để các nguyên liệu thấm vị.
              </li>
              <li>
                <strong>Hoàn Thành & Thưởng Thức:</strong> Bày salad ra đĩa, xếp
                trứng gà luộc lên trên. Có thể rắc thêm hạt điều, mè rang hoặc
                hạnh nhân lát để tăng hương vị. Dùng ngay để cảm nhận vị tươi
                ngon và béo ngậy.
              </li>
            </ol>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Mẹo Nhỏ Giúp Salad Cá Ngừ Ngon Hơn
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Chọn cá ngừ ngâm nước nếu muốn giảm lượng dầu mỡ.</li>
              <li>Thêm bơ cắt lát để tăng độ béo bùi.</li>
              <li>
                Dùng giấm táo thay cho nước cốt chanh để tạo vị chua thanh nhẹ.
              </li>
            </ul>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <p className="text-gray-700 mt-4">
              Chỉ với vài bước đơn giản, bạn đã có ngay món salad cá ngừ thanh
              mát, bổ dưỡng cho bữa ăn hàng ngày. Chúc bạn thành công! 🎉
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
