import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b066e44238ccc5a7e6d15b";
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
              Món Spaghetti Thật Tuyệt Vời – Đơn Giản, Ngon Miệng Và Dễ Làm!
            </h1>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-red-600">
                Đánh giá từ khách hàng A:
              </h2>
              <p className="mt-2">
                Hôm nay mình đã thử công thức làm spaghetti theo hướng dẫn mà
                mình tìm thấy, và kết quả thật sự vượt ngoài mong đợi! Món
                spaghetti này không chỉ dễ làm mà còn cực kỳ ngon, phù hợp cho
                bữa tối gia đình hay những bữa tiệc nhỏ!
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-green-600">
                Công thức làm spaghetti:
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>
                  <strong>Pasta:</strong> Mình sử dụng loại mì spaghetti tươi để
                  tạo độ mềm mại, dai vừa đủ. Bạn cũng có thể chọn mì khô nếu
                  thích.
                </li>
                <li>
                  <strong>Sốt cà chua:</strong> Mình đã sử dụng cà chua tươi xay
                  nhuyễn, kết hợp với gia vị như tỏi, hành tây và một chút dầu
                  olive. Để tạo hương vị đậm đà, mình cũng thêm một ít oregano
                  và basil.
                </li>
                <li>
                  <strong>Chế biến:</strong> Sau khi luộc mì, mình trộn đều với
                  sốt cà chua và thêm một ít phô mai Parmesan rắc lên trên. Tất
                  cả đều hòa quyện vào nhau, mang lại một món ăn hấp dẫn.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-blue-600">
                💬 Cảm nhận:
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Sốt cà chua ngọt tự nhiên, không quá chua hay ngấy.</li>
                <li>Mì spaghetti vừa chín tới, không bị nát hay quá cứng.</li>
                <li>Phô mai thêm vào giúp tăng thêm độ béo ngậy và đậm đà.</li>
                <li>Cả gia đình đều rất thích, đặc biệt là các bé nhỏ!</li>
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-purple-600">
                Lời khuyên:
              </h2>
              <p className="mt-2">
                Nếu bạn muốn món ăn thêm phần đặc sắc, đừng ngại thử thêm thịt
                bò băm hoặc hải sản. Món này cũng rất dễ dàng điều chỉnh theo sở
                thích của mỗi người.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-yellow-600">
                Kết luận:
              </h2>
              <p className="mt-2">
                Đây chắc chắn là một món ăn mà mình sẽ làm lại nhiều lần nữa.
                Nếu bạn đang tìm kiếm một công thức spaghetti đơn giản nhưng cực
                kỳ ngon, đừng bỏ qua món này! Đảm bảo mọi người trong gia đình
                sẽ khen mãi!
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
