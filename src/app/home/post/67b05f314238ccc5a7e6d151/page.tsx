import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b05f314238ccc5a7e6d151";
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
            <h1 className="text-2xl font-bold text-green-600">
              Cách Làm Snack Kale Chips – Giòn Rụm, Healthy và Độc Lạ! 🥬
            </h1>
            <p className="mt-2 text-gray-700">
              Kale chips (snack cải xoăn) là món ăn vặt siêu hot trong giới eat
              clean và healthy food. Không chỉ giòn rụm, ngon miệng mà còn cực
              kỳ tốt cho sức khỏe. Cùng thử ngay công thức làm kale chips tại
              nhà nhé!
            </p>

            <h2 className="text-xl font-semibold text-green-500 mt-4">
              🥬 Nguyên Liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>200g cải xoăn (kale)</li>
              <li>2 thìa canh dầu ô liu</li>
              <li>1/2 thìa cà phê muối biển</li>
              <li>1/2 thìa cà phê bột tỏi (tùy chọn)</li>
              <li>1/2 thìa cà phê phô mai bột (tùy chọn)</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-green-500 mt-4">
              🧑‍🍳 Cách Làm Kale Chips
            </h2>

            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 1: Sơ Chế Cải Xoăn
            </h3>
            <p className="text-gray-700">
              Rửa sạch, để ráo nước, tách lá cải xoăn thành từng miếng nhỏ, loại
              bỏ phần cuống cứng.
            </p>

            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 2: Nêm Gia Vị
            </h3>
            <p className="text-gray-700">
              Cho cải xoăn vào tô lớn, thêm dầu ô liu, muối, bột tỏi và trộn đều
              để lá được phủ đều gia vị.
            </p>

            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 3: Nướng Giòn
            </h3>
            <p className="text-gray-700">
              Xếp cải xoăn lên khay nướng, dàn đều, không để chồng lên nhau.
              Nướng ở 150°C trong 10-15 phút cho đến khi lá giòn rụm.
            </p>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-green-400 mt-3">
              Bước 4: Thưởng Thức
            </h3>
            <p className="text-gray-700">
              Để nguội bớt và rắc thêm phô mai bột nếu thích. Có thể bảo quản
              trong hộp kín để dùng dần.
            </p>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <p className="italic text-gray-600 mt-3">
              💡 <strong>Mẹo nhỏ:</strong> Có thể biến tấu với các vị khác như
              bột ớt, mật ong hoặc giấm balsamic để đổi khẩu vị!
            </p>

            <h2 className="text-xl font-semibold text-green-500 mt-4">
              ✨ Kết Luận
            </h2>
            <p className="text-gray-700">
              Vậy là chỉ trong vài phút, bạn đã có ngay món kale chips giòn rụm,
              thơm ngon và siêu healthy. Hãy thử ngay và chia sẻ thành phẩm cùng
              bạn bè nhé! 🌿✨
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
