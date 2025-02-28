import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b060f14238ccc5a7e6d153";
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
  }
};
const fetchUserByToken = async (token: string) => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching user by token");
  }
};
const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value || "";
  const post = await fetchPostById();
  const user: UserBe | null = await fetchUserByToken(token);
  return (
    <section className="w-[70%] mx-auto py-8 mt-5">
      <div className="flex flex-col gap-5 p-5 text-center mb-7">
        <h1 className="lg:text-5xl text-3xl font-bold">{post.title}</h1>
        <div className="text-sm font-semibold">
           <Badge>{categoryRecord[post.categoryId.name]}</Badge>
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
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Cách Làm Kim Chi Chuẩn Vị Hàn Quốc Tại Nhà
            </h1>

            <p className="text-gray-700 mb-4">
              Kim chi là món dưa muối trứ danh của Hàn Quốc, mang hương vị đặc
              trưng với sự hài hòa giữa vị cay, chua và mặn. Hãy cùng tham khảo
              cách làm kim chi ngon chuẩn vị ngay tại nhà!
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Nguyên Liệu
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>1 bắp cải thảo (khoảng 1,5 kg)</li>
              <li>1 củ cà rốt</li>
              <li>1 củ củ cải trắng</li>
              <li>5 cây hành lá</li>
              <li>1 củ gừng băm</li>
            </ul>
            <Image
              src={post.images[1]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Gia Vị Cần Có
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>100g muối hạt</li>
              <li>50g đường</li>
              <li>2 thìa canh bột nếp</li>
              <li>50ml nước mắm</li>
              <li>2 thìa tôm khô băm nhỏ</li>
              <li>1 thìa bột ớt Hàn Quốc</li>
              <li>1 thìa tỏi băm</li>
              <li>1 thìa gừng băm</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Cách Làm Kim Chi
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                <strong>Sơ Chế Cải Thảo:</strong> Cắt cải thảo làm 4 phần theo
                chiều dài, rửa sạch, ngâm nước muối 2-3 giờ, sau đó rửa lại.
              </li>
              <li>
                <strong>Chuẩn Bị Gia Vị:</strong> Hòa bột nếp với nước, đun sôi,
                trộn với đường, tỏi, gừng, nước mắm, bột ớt và tôm khô.
              </li>
              <li>
                <strong>Trộn Kim Chi:</strong> Cắt nhỏ cà rốt, củ cải, hành lá,
                trộn cùng hỗn hợp gia vị. Phết gia vị vào từng lá cải thảo.
              </li>
              <li>
                <strong>Muối Kim Chi:</strong> Xếp kim chi vào hũ, ấn chặt, để ở
                nhiệt độ phòng 1-2 ngày rồi bảo quản trong tủ lạnh.
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
              Mẹo Nhỏ Khi Làm Kim Chi
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Chọn cải thảo tươi, non để kim chi ngon hơn.</li>
              <li>Dùng bột ớt Hàn Quốc để có vị cay đặc trưng.</li>
              <li>Kim chi ngon nhất sau 1 tuần bảo quản trong tủ lạnh.</li>
            </ul>

            <p className="text-gray-700 mt-4">
              Với công thức này, bạn có thể làm kim chi chuẩn vị Hàn Quốc ngay
              tại nhà. Chúc bạn thành công! 🎉
            </p>
          </div>
          <div className="py-7 flex flex-col gap-8">
            <Comment postId={post._id} user={user} />
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
