import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67ae24b2011a0fe9bada81f9";
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
            src={post.images[5]}
            alt="Limoncello"
            width={500}
            height={500}
            className="w-full h-auto pb-5"
          />
          <div className="flex flex-col text-gray-700 leading-relaxed gap-5">
            <h2 className="text-xl font-semibold text-orange-500 mt-6">
              Nguyên Liệu Cần Chuẩn Bị
            </h2>
            <ul className="list-disc pl-5 mt-2">
              <li>1 chiếc ức gà hoặc đùi gà (khoảng 300g)</li>
              <li>1 lít nước dùng gà (hoặc nước lọc)</li>
              <li>1 củ hành tây</li>
              <li>1 củ cà rốt</li>
              <li>1 bắp ngô ngọt</li>
              <li>2 quả trứng gà</li>
              <li>2 muỗng canh bột năng hoặc bột bắp</li>
              <li>100g nấm hương hoặc nấm rơm</li>
              <li>Hành lá, rau mùi thái nhỏ</li>
              <li>Muối, tiêu, hạt nêm, nước mắm</li>
              <li>1 muỗng canh dầu mè</li>
            </ul>
            <Image
              src={post.images[3]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-orange-500 mt-6">
              Hướng Dẫn Cách Làm
            </h2>
            <h3 className="text-lg font-semibold mt-4">
              Bước 1: Sơ Chế Nguyên Liệu
            </h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Gà rửa sạch, luộc chín với một ít muối...</li>
              <li>Hành tây bóc vỏ, băm nhỏ...</li>
            </ul>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h3 className="text-lg font-semibold mt-4">
              Bước 2: Nấu Nước Dùng
            </h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Đun sôi nước dùng gà trên bếp...</li>
              <li>
                Cho hành tây, cà rốt, ngô và nấm vào nấu khoảng 10 phút...
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">Bước 3: Nấu Súp</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Thêm thịt gà xé vào nồi, khuấy nhẹ để gà ngấm gia vị.</li>
              <li>
                Nêm nếm gia vị với muối, hạt nêm, nước mắm sao cho vừa khẩu vị.
              </li>
              <li>
                Khuấy đều bột năng đã pha rồi đổ từ từ vào nồi súp, khuấy liên
                tục để súp có độ sánh mịn.
              </li>
              <li>
                Đổ trứng gà vào từ từ, vừa đổ vừa khuấy nhẹ theo vòng tròn để
                tạo vân đẹp mắt.
              </li>
            </ul>
            <Image
              src={post.images[6]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />

            <h3 className="text-lg font-semibold mt-4">
              Bước 4: Hoàn Thiện Món Súp
            </h3>
            <ul className="list-disc pl-5 mt-2">
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
              src={post.images[7]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <h2 className="text-xl font-semibold text-orange-500 mt-6">
              Lợi Ích Của Súp Gà
            </h2>
            <ul className="list-disc pl-5 mt-2">
              <li>Cung cấp protein giúp tăng cường sức khỏe.</li>
              <li>Giàu vitamin và khoáng chất từ rau củ.</li>
              <li>Giúp cơ thể hồi phục nhanh chóng khi bị ốm.</li>
            </ul>

            <p className="mt-6">
              Hãy vào bếp ngay hôm nay và trổ tài nấu món súp gà thơm ngon nhé!
              🥣
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
