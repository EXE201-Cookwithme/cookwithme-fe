import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67ae233ac50363732046010e";
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
            <p>
              Nếu bạn đang tìm kiếm một món ăn nhẹ nhàng, giàu dinh dưỡng cho
              những ngày chay hoặc không muốn ăn thịt cá, súp bí đỏ chính là lựa
              chọn hoàn hảo. Chỉ với vài nguyên liệu dễ tìm và những bước chế
              biến đơn giản, bạn đã có ngay một món súp bí đỏ thơm ngon, béo
              ngậy, đầy đủ chất dinh dưỡng.
            </p>
            <p>
              Súp bí đỏ với màu vàng cam tươi sáng sẽ khiến bạn không thể rời
              mắt. Vị súp vừa béo ngậy từ bí đỏ, lại vừa bùi bùi từ khoai tây,
              khi thêm một chút kem tươi, món ăn sẽ trở nên cực kỳ hấp dẫn và
              thơm lừng.
            </p>
            <div>
              <strong>Nguyên Liệu Chuẩn Bị</strong>
              <ul>
                <li>- 500g bí đỏ</li>
                <li>- 200ml sữa tươi không đường (hoặc kem tươi)</li>
                <li>- 1 củ hành tây</li>
                <li>- 2 từng tỏi bấm nhỏ</li>
                <li>- 500ml nước dỡ hầm xương (hoặc nước lác)</li>
                <li>- 2 thìa dầu oliu (hoặc bơ)</li>
                <li>- Muối, hạt tiêu, gia vị tùy chỉnh</li>
              </ul>
            </div>
            <div>
              <strong>Cách Chế Biến</strong>
              <ul>
                <li>
                  <strong>Bước 1: Sơ Chế Nguyên Liệu</strong>
                </li>
                <li>- Bí đỏ gọt vỏ, bỏ hạt và cắt lục.</li>
                <Image
                  src={post.images[1]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <li>- Hành tây, tỏi bóc vỏ, thái nhỏ.</li>
                <Image
                  src={post.images[2]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <li>
                  <strong>Bước 2: Xào Nguyên Liệu</strong>
                  <Image
                    src={post.images[3]}
                    alt="Limoncello"
                    width={500}
                    height={500}
                    className="w-full h-auto pb-5"
                  />
                </li>
                <li>
                  - Bắc nồi lên bếp, cho dầu oliu vào, phi tỏi và hành tây cho
                  dừa mùi.
                </li>
                <li>- Cho bí đỏ vào xào sơ trong 2 phút.</li>
                <Image
                  src={post.images[4]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <li>
                  <strong>Bước 3: Nấu Soup</strong>
                </li>
                <li>
                  - Thêm nước dỡ hầm xương và nâu trong 15-20 phút cho bí mềm.
                </li>
                <li>- Dùng máy xay sinh tố xay nhuyễn hỗn hợp.</li>
                <Image
                  src={post.images[5]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <li>
                  <strong>Bước 4: Hoàn Thiện Món Ăn</strong>
                </li>
                <li>- Cho sữa tươi hoặc kem tươi vào, khuấy đều.</li>
                <li>- Nấu thêm 2 phút, thêm muối, hạt tiêu tùy khẩu vị.</li>
                <Image
                  src={post.images[6]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
              </ul>
            </div>
            <div>
              <strong>Thưởng Thức</strong>
              <p>
                Múc súp bí đỏ ra bát, trang trí với ít lá nguyệt rắc lên. Dùng
                kèm với bánh mì nướng hoặc salad rau tươi.
              </p>
            </div>
            <div>
              <strong>Lợi Ích Của Súp Bí Đỏ</strong>
              <ul>
                <li>- Giàu vitamin A, C tốt cho mắt và da.</li>
                <li>- Hỗ trợ hệ tiêu hóa và tăng cường hệ miễn dịch.</li>
                <li>- Thích hợp cho bé ăn dặm và người giảm cân.</li>
              </ul>
            </div>
            <p>
              Hãy làm thử và cảm nhận sự béo ngọt từng muỗng súp bí đỏ này nhé!
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
