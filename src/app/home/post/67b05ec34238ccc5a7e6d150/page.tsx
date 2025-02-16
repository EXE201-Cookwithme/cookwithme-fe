import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b05ec34238ccc5a7e6d150";
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
            <h1 className="text-2xl font-bold text-yellow-600">
              Cách Làm Snack Bánh Mì Bơ Đường Giòn Tan, Ngon Khó Cưỡng! 🥖
            </h1>
            <p className="mt-2 text-gray-700">
              Snack bánh mì bơ đường là món ăn vặt đơn giản nhưng cực kỳ thơm
              ngon, giòn rụm và hấp dẫn. Chỉ với vài nguyên liệu có sẵn trong
              bếp, bạn có thể tự tay làm món snack này ngay tại nhà. Cùng bắt
              tay vào làm nhé!
            </p>

            <h2 className="text-xl font-semibold text-yellow-500 mt-4">
              🥖 Nguyên Liệu Cần Chuẩn Bị
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>3 lát bánh mì sandwich (hoặc bánh mì baguette)</li>
              <li>50g bơ lạt</li>
              <li>40g đường cát</li>
              <li>1/2 thìa cà phê muối</li>
              <li>1/2 thìa cà phê bột quế (tùy chọn)</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-yellow-500 mt-4">
              🧑‍🍳 Cách Làm Snack Bánh Mì Bơ Đường
            </h2>

            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 1: Chuẩn Bị Bánh Mì
            </h3>
            <p className="text-gray-700">
              Cắt bánh mì thành từng miếng vuông nhỏ hoặc lát mỏng theo sở
              thích.
            </p>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 2: Pha Hỗn Hợp Bơ Đường
            </h3>
            <p className="text-gray-700">
              Đun chảy bơ, sau đó trộn với đường, muối và bột quế (nếu dùng).
            </p>

            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 3: Áo Bơ Lên Bánh Mì
            </h3>
            <p className="text-gray-700">
              Dùng cọ phết đều hỗn hợp bơ đường lên từng miếng bánh mì, đảm bảo
              bơ thấm đều để bánh giòn ngon hơn.
            </p>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 4: Nướng Bánh
            </h3>
            <p className="text-gray-700">
              Xếp bánh lên khay nướng, cho vào lò nướng ở 150°C trong 10-15 phút
              đến khi bánh vàng giòn. Nếu không có lò nướng, bạn có thể chiên
              giòn trên chảo với lửa nhỏ.
            </p>
            <Image
              src={post.images[4]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 5: Thưởng Thức
            </h3>
            <p className="text-gray-700">
              Chờ bánh nguội bớt rồi thưởng thức ngay hoặc bảo quản trong hộp
              kín để dùng dần.
            </p>

            <p className="italic text-gray-600 mt-3">
              💡 <strong>Mẹo nhỏ:</strong> Bạn có thể rắc thêm phô mai bột hoặc
              sữa đặc để tăng hương vị cho món snack này!
            </p>

            <h2 className="text-xl font-semibold text-yellow-500 mt-4">
              ✨ Kết Luận
            </h2>
            <p className="text-gray-700">
              Vậy là chỉ trong vài phút, bạn đã có ngay món snack bánh mì bơ
              đường giòn rụm, thơm lừng. Hãy thử ngay và chia sẻ thành phẩm cùng
              bạn bè nhé! 🥰✨
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
