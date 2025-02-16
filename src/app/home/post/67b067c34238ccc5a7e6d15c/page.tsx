import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b067c34238ccc5a7e6d15c";
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
            <h1 className="text-2xl font-bold text-gray-800">
              Sinh Tố Bơ – Ngon Tuyệt Vời Và Dễ Làm!
            </h1>
            <div className="mt-4">
              <p className="mt-2">
                Hôm qua mình thử làm sinh tố bơ và thật sự rất ấn tượng với
                hương vị của nó! Mình đã làm một mẻ sinh tố bơ với một quả bơ
                chín, một chút sữa đặc và sữa tươi để tạo độ béo ngậy. Sau đó,
                mình thêm một ít đá để sinh tố thêm phần mát lạnh, tươi mới.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-green-600">
                Kết quả thật tuyệt vời!
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Sinh tố bơ mịn màng, thơm ngon và không quá ngọt.</li>
                <li>
                  Thêm chút mật ong giúp tăng độ ngọt tự nhiên, hòa quyện tuyệt
                  vời với hương bơ béo ngậy.
                </li>
                <li>
                  Thử thêm một ít chuối để tăng độ ngọt và giúp sinh tố thêm
                  phần dẻo mịn – quả thật rất ngon!
                </li>
              </ul>
            </div>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-blue-600">
                Lưu ý nhỏ:
              </h2>
              <p className="mt-2">
                Nếu bạn muốn sinh tố mát lạnh hơn, đừng quên thêm chút đá vào để
                tạo cảm giác sảng khoái. Đây là một thức uống không chỉ ngon mà
                còn rất bổ dưỡng.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-yellow-600">
                Kết luận:
              </h2>
              <p className="mt-2">
                Mình chắc chắn sẽ làm lại món này thường xuyên! Nếu bạn đang tìm
                kiếm một công thức sinh tố đơn giản nhưng cực kỳ ngon, đừng bỏ
                qua món này. Đảm bảo bạn sẽ thích!
              </p>
            </div>
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
