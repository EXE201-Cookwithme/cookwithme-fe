import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b05d6c4238ccc5a7e6d14e";
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
              Cách Làm Snack Khoai Tây Giòn Rụm Tại Nhà
            </h1>
            <p className="mt-2 text-gray-700">
              Snack khoai tây có lẽ là một món ăn vặt từ khoai tây hết sức phổ
              biến mà hầu như hội những người ăn vặt đều vô cùng yêu thích.
              Khoai tây cắt lát mỏng vàng ruộm, giòn tan thêm chút gia vị mằn
              mặn quả là hương vị vốn quen thuộc nhưng vẫn rất lôi cuốn.
            </p>
            <p className="mt-2 text-gray-700">
              Snack khoai tây ngoài ăn với muối có thể rắc thêm các loại bột gia
              vị như bột phô mai, bột ớt, bột hành hay bột tỏi cũng là một lựa
              chọn không tồi đó!
            </p>

            <h2 className="text-xl font-semibold text-yellow-500 mt-4">
              Nguyên Liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>3 củ khoai tây lớn</li>
              <li>1/2 thìa cà phê muối</li>
              <li>1/2 thìa cà phê bột tỏi (tùy chọn)</li>
              <li>1/2 thìa cà phê bột ớt (tùy chọn)</li>
              <li>Dầu ăn</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-yellow-500 mt-4">
              Cách Làm
            </h2>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 1: Sơ Chế Khoai Tây
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Gọt vỏ, rửa sạch và thái lát mỏng.</li>
              <li>
                Ngâm khoai trong nước muối loãng khoảng 15 phút để loại bỏ bớt
                tinh bột, giúp snack giòn hơn.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 2: Làm Ráo Khoai
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Vớt khoai ra, rửa lại với nước rồi lau khô bằng khăn giấy.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 3: Chiên Khoai
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Đun nóng dầu trong chảo.</li>
              <li>Thả khoai vào chiên ở lửa vừa đến khi vàng giòn.</li>
              <li>Vớt khoai ra để ráo dầu trên giấy thấm.</li>
            </ul>

            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 4: Nêm Gia Vị
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Rắc muối, bột tỏi hoặc bột ớt tùy khẩu vị và trộn đều.</li>
            </ul>

            <h3 className="text-lg font-medium text-yellow-400 mt-3">
              Bước 5: Thưởng Thức
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Để snack nguội bớt rồi thưởng thức ngay.</li>
              <li>Có thể bảo quản trong hộp kín để giữ độ giòn.</li>
            </ul>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-yellow-500 mt-4">
              Kết Luận
            </h2>
            <p className="text-gray-700">
              Chỉ với vài bước đơn giản, bạn đã có ngay món snack khoai tây giòn
              tan, thơm ngon không thua kém các loại snack đóng gói. Hãy thử làm
              ngay và chia sẻ thành phẩm với bạn bè nhé!
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
