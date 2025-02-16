import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b20a4260e23df17774843b";
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
            src={post.images[1]}
            alt="Limoncello"
            width={500}
            height={500}
            className="w-full h-auto pb-5"
          />

          <div className="flex flex-col text-gray-700 leading-relaxed gap-5">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">
              Sinh Tố Bơ Chuối Hạnh Nhân – Bổ Dưỡng, Tốt Cho Sức Khỏe 🥑🍌
            </h2>
            <p className="text-gray-700 mb-4">
              Sinh tố bơ chuối hạnh nhân là một lựa chọn tuyệt vời cho bữa sáng
              hoặc bữa phụ giúp cung cấp năng lượng và dưỡng chất cho cơ thể.
              Với sự kết hợp giữa bơ béo ngậy, chuối ngọt tự nhiên và sữa hạnh
              nhân thơm ngon, thức uống này không chỉ ngon miệng mà còn rất tốt
              cho sức khỏe.
            </p>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">
              Nguyên Liệu Cần Chuẩn Bị
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>1 quả bơ chín</li>
              <li>1 quả chuối</li>
              <li>200ml sữa hạnh nhân (hoặc sữa tươi)</li>
              <li>1 muỗng cà phê mật ong (tùy chọn)</li>
              <li>Đá viên</li>
            </ul>
            <Image
              src={post.images[0]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">
              Hướng Dẫn Cách Làm
            </h3>
            <h4 className="text-lg font-medium text-yellow-700 mb-1">
              Bước 1: Sơ chế nguyên liệu
            </h4>
            <p className="text-gray-700 mb-4">
              Bơ bổ đôi, bỏ hạt, lấy phần thịt. Chuối bóc vỏ, cắt thành từng
              khoanh nhỏ.
            </p>
            <h4 className="text-lg font-medium text-yellow-700 mb-1">
              Bước 2: Xay sinh tố
            </h4>
            <p className="text-gray-700 mb-4">
              Cho bơ, chuối, sữa hạnh nhân và mật ong vào máy xay sinh tố. Thêm
              đá viên và xay nhuyễn đến khi hỗn hợp mịn mượt.
            </p>
            <h4 className="text-lg font-medium text-yellow-700 mb-1">
              Bước 3: Thưởng thức
            </h4>
            <p className="text-gray-700 mb-4">
              Rót sinh tố ra ly, trang trí thêm lát chuối hoặc hạt hạnh nhân lên
              trên và thưởng thức ngay.
            </p>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">
              Mẹo Nhỏ Để Sinh Tố Ngon Hơn
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>
                Dùng chuối chín để có vị ngọt tự nhiên, không cần thêm đường.
              </li>
              <li>Thêm hạt chia, hạt lanh để tăng giá trị dinh dưỡng.</li>
              <li>
                Muốn sinh tố đặc hơn? Giảm lượng sữa hoặc thêm sữa chua không
                đường.
              </li>
              <li>
                Dùng chuối đông lạnh thay vì đá viên để có kết cấu kem mịn hơn.
              </li>
            </ul>
            <p className="text-gray-700 font-semibold">
              Sinh tố bơ chuối hạnh nhân không chỉ thơm ngon mà còn rất tốt cho
              sức khỏe. Hãy thử ngay hôm nay để bổ sung năng lượng và dưỡng chất
              cho cơ thể nhé! 💚💛
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
