import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b20db160e23df17774843f";
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
            <h2 className="text-2xl font-bold text-orange-700 mb-4">
              Món soup bí đỏ tuyệt vời từ công thức trên website – Ngon, dễ làm
              và cực kỳ bổ dưỡng! 🍲💛
            </h2>
            <p className="text-gray-700 mb-4">
              Mình vừa thử công thức soup bí đỏ từ website và phải nói rằng kết
              quả thật sự ngoài mong đợi! Đây là món ăn không chỉ dễ làm mà còn
              rất ngon miệng, lại cực kỳ tốt cho sức khỏe.
            </p>
            <p className="text-gray-700 mb-4">
              Công thức rất chi tiết, từng bước hướng dẫn rất dễ hiểu, giúp mình
              không gặp bất kỳ khó khăn nào khi làm. Bí đỏ được nấu mềm, kết hợp
              với sữa tươi và gia vị thật hoàn hảo, tạo nên một hương vị đậm đà
              mà không bị ngấy. Soup có độ mịn vừa phải, ngọt tự nhiên từ bí đỏ
              mà không cần phải dùng quá nhiều đường.
            </p>
            <p className="text-gray-700 mb-4">
              Điểm đặc biệt mình thích ở công thức này là cách chọn nguyên liệu
              tươi ngon và chế biến rất hợp lý. Mình cũng thêm một chút tiêu và
              hành tây theo công thức để tăng thêm độ thơm và đậm đà cho món
              soup.
            </p>
            <p className="text-gray-700 mb-4">
              💡 Món này không chỉ là lựa chọn tuyệt vời cho những ngày se lạnh,
              mà còn là một bữa ăn bổ dưỡng cho cả gia đình. Mình sẽ chắc chắn
              làm lại món này nhiều lần nữa!
            </p>
            <p className="text-gray-700 font-semibold">
              Cảm ơn website đã cung cấp công thức tuyệt vời này, mình rất hài
              lòng với kết quả và chắc chắn sẽ chia sẻ với mọi người!
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
