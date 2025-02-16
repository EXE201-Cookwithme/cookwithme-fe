import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b2094f60e23df17774843a";
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
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Trà Sả Chanh Mật Ong - Thư Giãn, Giải Nhiệt 🍵🍯
            </h2>
            <p className="text-gray-700 mb-4">
              Trà sả chanh mật ong là thức uống tuyệt vời giúp thanh lọc cơ thể,
              giảm căng thẳng và tăng cường sức đề kháng. Sự kết hợp giữa sả
              thơm, chanh chua nhẹ và vị ngọt thanh của mật ong tạo nên một loại
              trà vừa thơm ngon vừa tốt cho sức khỏe.
            </p>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Nguyên Liệu Cần Chuẩn Bị
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>2 cây sả</li>
              <li>1 quả chanh</li>
              <li>2 muỗng cà phê mật ong</li>
              <li>500ml nước</li>
              <li>Đá viên (tùy thích)</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Hướng Dẫn Cách Làm
            </h3>
            <h4 className="text-lg font-medium text-green-700 mb-1">
              Bước 1: Ủ trà
            </h4>
            <p className="text-gray-700 mb-4">
              Bạn lấy 5g trà Ô Long cho vào ấm, sau đó cắt 1 cây sả ra thành 3
              khúc và cho vào cùng với trà. Tiếp theo, đổ 160ml nước nóng vào
              đậy nắp và ủ trà trong vòng 20 phút.
            </p>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h4 className="text-lg font-medium text-green-700 mb-1">
              Bước 2: Pha trà
            </h4>
            <p className="text-gray-700 mb-4">
              Rót phần nước trà đã ngấm đường vào bình lắc tiêu chuẩn. Cắt 1 quả
              chanh thành 2 nửa, vắt lấy nước và cho vào bình. Thêm 15ml mật ong
              và đá, sau đó lắc mạnh trong 15-20 giây.
            </p>
            <Image
              src={post.images[4]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h4 className="text-lg font-medium text-green-700 mb-1">
              Bước 3: Trang trí
            </h4>
            <p className="text-gray-700 mb-4">
              Rót trà chanh sả mật ong ra cốc, trang trí bằng lát chanh và một
              cây sả để tăng hương vị.
            </p>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Thành phẩm
            </h3>
            <p className="text-gray-700 mb-4">
              Trà có màu sắc bắt mắt, mùi thơm thoang thoảng. Khi uống kèm đá
              lạnh, bạn sẽ cảm nhận được sự sảng khoái và tràn đầy năng lượng.
            </p>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Mẹo Nhỏ
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Không thêm mật ong vào nước quá nóng để giữ dưỡng chất.</li>
              <li>Thêm vài lát chanh tươi để tăng hương vị.</li>
              <li>Thêm lá bạc hà để tạo cảm giác sảng khoái.</li>
            </ul>
            <p className="text-gray-700 font-semibold">
              Trà sả chanh mật ong không chỉ thơm ngon mà còn rất tốt cho sức
              khỏe. Hãy thử làm ngay để tận hưởng hương vị tuyệt vời này nhé!
              🍵🍯
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
