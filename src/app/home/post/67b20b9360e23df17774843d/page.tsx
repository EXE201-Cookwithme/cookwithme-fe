import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b20b9360e23df17774843d";
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
            <h2 className="text-2xl font-bold text-brown-700 mb-4">
              Cà Phê Muối ☕
            </h2>
            <p className="text-gray-700 mb-4">
              Cà phê muối là sự kết hợp độc đáo giữa vị đắng của cà phê và vị
              mặn nhẹ của muối, tạo nên hương vị đặc biệt và hấp dẫn.
            </p>
            <h3 className="text-xl font-semibold text-brown-800 mb-2">
              Nguyên Liệu
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>25g cà phê nguyên chất</li>
              <li>1 muỗng nhỏ muối</li>
              <li>1 muỗng bột ca cao</li>
              <li>40ml kem béo thực vật</li>
              <li>10ml sữa tươi</li>
              <li>30ml sữa đặc có đường</li>
              <li>100ml nước sôi</li>
              <li>Đá viên</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-xl font-semibold text-brown-800 mb-2">
              Cách Làm
            </h3>
            <h4 className="text-lg font-medium text-brown-700 mb-1">
              Bước 1: Pha Cà Phê
            </h4>
            <p className="text-gray-700 mb-4">
              Cho 25g bột cà phê vào phin, nén chặt. Thêm 25ml nước sôi, chờ 2
              phút rồi chắt bỏ nước đầu. Tiếp tục thêm 50ml nước sôi, chờ cà phê
              nhỏ giọt hoàn toàn.
            </p>
            <h4 className="text-lg font-medium text-brown-700 mb-1">
              Bước 2: Làm Kem Muối
            </h4>
            <p className="text-gray-700 mb-4">
              Đánh bông 50ml whipping cream, 20ml sữa đặc và 3g muối trong
              khoảng 20 giây để tạo lớp kem sánh mịn.
            </p>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h4 className="text-lg font-medium text-brown-700 mb-1">
              Bước 3: Hoàn Thành
            </h4>
            <p className="text-gray-700 mb-4">
              Đổ cà phê vào ly, thêm 20ml sữa đặc, sau đó nhẹ nhàng đổ lớp kem
              muối lên trên. Thưởng thức!
            </p>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-xl font-semibold text-brown-800 mb-2">
              Mẹo Nhỏ
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>
                Điều chỉnh lượng muối theo khẩu vị để đạt được hương vị cân
                bằng.
              </li>
              <li>Có thể thêm bột ca cao để tăng độ đậm đà.</li>
              <li>Đánh kem muối vừa phải để có độ sánh mịn, không quá đặc.</li>
            </ul>
            <p className="text-gray-700 font-semibold">
              Cà phê muối có hương vị hấp dẫn, vừa đậm đà vừa béo thơm. Hãy thử
              ngay hôm nay! ☕✨
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
