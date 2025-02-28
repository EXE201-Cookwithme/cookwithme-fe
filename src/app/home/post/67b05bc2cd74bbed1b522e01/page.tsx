import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b05bc2cd74bbed1b522e01";
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
            src={post.images[2]}
            alt="Limoncello"
            width={500}
            height={500}
            className="w-full h-auto pb-5"
          />
          <div className="flex flex-col text-gray-700 leading-relaxed gap-5">
            <h2 className="text-xl font-semibold text-orange-500 mt-6">
              Nguyên Liệu Cần Chuẩn Bị
            </h2>
            <ul className="list-disc pl-5 mb-4">
              <li>200g tôm sú</li>
              <li>200g mực tươi</li>
              <li>100g ngao (hoặc sò)</li>
              <li>1 lít nước dùng xương (hoặc nước dùng gà)</li>
              <li>1 củ cà rốt</li>
              <li>1 bắp ngô ngọt</li>
              <li>100g nấm hương</li>
              <li>2 quả trứng gà</li>
              <li>2 muỗng canh bột năng (hoặc bột bắp)</li>
              <li>Hành lá, rau mùi</li>
              <li>Muối, tiêu, hạt nêm, nước mắm</li>
              <li>1 muỗng canh dầu mè</li>
            </ul>

            <h2 className="text-xl font-semibold text-orange-500 mt-6">
              Hướng Dẫn Cách Làm
            </h2>

            <h3 className="text-lg font-medium text-gray-700 mt-4">
              Bước 1: Sơ Chế Nguyên Liệu
            </h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Tôm bóc vỏ, rút chỉ đen, rửa sạch rồi cắt nhỏ.</li>
              <li>Mực làm sạch, thái miếng vừa ăn.</li>
              <li>Ngao rửa sạch, luộc sơ để mở vỏ, lấy phần thịt.</li>
              <li>Cà rốt gọt vỏ, cắt hạt lựu.</li>
              <li>
                Ngô tách hạt, nấm hương ngâm nước cho mềm, rửa sạch rồi thái
                nhỏ.
              </li>
              <li>Trứng gà đập ra bát, đánh tan.</li>
              <li>
                Hòa tan bột năng với 100ml nước lọc để tạo độ sánh cho súp.
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Image
                  src={post.images[1]}
                  alt="Limoncello"
                  width={100}
                  height={100}
                  className="w-full h-auto pb-5"
                />
                <Image
                  src={post.images[5]}
                  alt="Limoncello"
                  width={100}
                  height={100}
                  className="w-full h-auto pb-5"
                />
              </div>
              <div>
                <Image
                  src={post.images[3]}
                  alt="Limoncello"
                  width={100}
                  height={100}
                  className="w-full h-auto pb-5"
                />
                <Image
                  src={post.images[4]}
                  alt="Limoncello"
                  width={100}
                  height={100}
                  className="w-full h-auto pb-5"
                />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mt-4">
              Bước 2: Nấu Nước Dùng
            </h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Đun sôi nước dùng xương trên bếp, vớt bọt để nước trong.</li>
              <li>
                Thêm cà rốt, ngô và nấm vào nấu khoảng 10 phút cho rau củ mềm.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-700 mt-4">
              Bước 3: Nấu Súp Hải Sản
            </h3>
            <ul className="list-disc pl-5 mb-4">
              <li>
                Cho tôm, mực và ngao vào nồi, đảo đều, đun thêm 5 phút để hải
                sản chín.
              </li>
              <li>
                Nêm nếm gia vị với muối, hạt nêm, nước mắm sao cho vừa khẩu vị.
              </li>
              <li>
                Đổ từ từ bột năng đã pha vào nồi súp, khuấy liên tục để tạo độ
                sánh mịn.
              </li>
              <li>
                Tiếp tục đổ trứng gà vào từ từ, vừa đổ vừa khuấy nhẹ để tạo vân
                đẹp mắt.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-700 mt-4">
              Bước 4: Hoàn Thiện Món Súp
            </h3>
            <ul className="list-disc pl-5 mb-4">
              <li>
                Khi súp sánh và thơm, tắt bếp rồi thêm dầu mè vào khuấy đều.
              </li>
              <li>Rắc hành lá, rau mùi lên trên để tăng hương vị.</li>
              <li>
                Múc súp ra bát, rắc thêm chút tiêu xay và thưởng thức ngay khi
                còn nóng.
              </li>
            </ul>
            <Image
              src={post.images[0]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-orange-500 mt-6">
              Lợi Ích Của Súp Hải Sản
            </h2>
            <ul className="list-disc pl-5 mb-4">
              <li>Giàu protein và omega-3, tốt cho sức khỏe tim mạch.</li>
              <li>Cung cấp vitamin và khoáng chất từ hải sản và rau củ.</li>
              <li>Hỗ trợ hệ miễn dịch và giúp cơ thể phục hồi nhanh chóng.</li>
            </ul>

            <p className="font-medium text-gray-800">
              Chúc bạn thực hiện thành công món súp hải sản ngon tuyệt này! 🥣
            </p>

            <div className="mt-8 border-t border-b pb-6 pt-5">
              <h2 className="text-xl font-bold mb-3">Related Links</h2>
              <ul className="list-disc list-inside text-blue-600">
                {post.links.map((link: string, index: number) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
