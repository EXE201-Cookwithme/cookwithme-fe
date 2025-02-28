import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b06dde4238ccc5a7e6d162";
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
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Beef Bourguignon (Pháp) - Bò Hầm Rượu Vang
              </h1>
              <p className="text-gray-600">
                Beef Bourguignon là một món hầm nổi tiếng của Pháp, được nấu từ
                thịt bò mềm mại cùng rượu vang đỏ và rau củ, tạo nên hương vị
                đậm đà và thơm ngon.
              </p>
            </header>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Nguyên Liệu Nấu Bœuf Bourguignon
              </h2>
              <Image
                src={post.images[1]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-48">Thịt bò</span>
                  <span>phần gân bò hoặc thịt đùi, thái miếng vừa ăn</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Thịt xông khói</span>
                  <span>bacon cắt nhỏ</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Hành tây</span>
                  <span>thái nhỏ</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Cà rốt</span>
                  <span>thái lát</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Nấm</span>
                  <span>nấm hương hoặc nấm đùi gà thái lát</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Tỏi</span>
                  <span>băm nhỏ</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Bột mì</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Rượu vang đỏ</span>
                  <span>1 chai (tốt nhất là rượu vang Burgundy)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Lá nguyệt quế</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Húng tây</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Muối, tiêu</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48">Bơ</span>
                </li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">Cách Thực Hiện Món Ăn</h2>

              <div>
                <h3 className="text-xl font-medium mb-2">
                  Bước 1: Xào thịt bò
                </h3>
                <p className="text-gray-800">
                  Cho bơ vào vào nồi và đun nóng cho bơ tan chảy. Sau đó cho
                  thịt bò và bacon đã chuẩn bị từ trước vào vào thơm cùng với bơ
                  cho đến khi các mặt thịt bò đều chuyển màu nâu và bacon được
                  cháy cạnh. Sau khi xào xong, vớt thịt bò để ra bên ngoài.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Bước 2: Xào rau củ</h3>
                <p className="text-gray-800">
                  Trong cùng nồi lúc nãy sau khi đã xào thịt bò xong thì tiếp
                  tục dùng để xào rau củ. Cho hành tây, cà rốt đã thái từ trước
                  vào xào trong nồi cho đến khi hành tây mềm và chuyển màu vàng.
                  Thêm tỏi băm vào và xào thêm 1-2 phút cho đến khi tỏi dậy mùi
                  thơm.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Bước 3: Hầm món ăn</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Cho thịt bò và bacon đã xào từ lúc nãy vào nồi rau củ. Rắc
                    thêm 1 ít bột mì lên thịt và khuấy đều để bột mì bám đều lên
                    các miếng thịt.
                  </li>
                  <li>
                    Đổ rượu vang đỏ vào nồi cho ngập thịt, thêm lá nguyệt quế,
                    húng tây, muối và tiêu vào nồi. Khuấy đều và đun sôi.
                  </li>
                  <li>
                    Khi nước sôi, bật lửa nhỏ và hầm món ăn trong khoảng từ 2
                    đến 3 tiếng hồ cho đến khi thịt bò mềm và nước sốt bắt đầu
                    sánh lại.
                  </li>
                  <li>
                    Thêm nấm vào hầm vào khoảng 30 phút trước khi tắt bếp.
                  </li>
                </ul>
                <p className="mt-2 text-gray-600">
                  Lưu ý: Cần thỉnh thoảng kiểm tra món ăn và khuấy đều để đảm
                  bảo món ăn không bị dính đáy nồi dẫn đến bị cháy.
                </p>
              </div>
            </section>
            <Image
              src={post.images[2]}
              alt="Limoncello"
              width={500}
              height={500}
              className="w-full h-auto pb-5"
            />
            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Mẹo nấu ngon</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Dùng rượu vang đỏ chất lượng tốt để tăng hương vị cho món ăn.
                </li>
                <li>Hầm càng lâu, thịt càng mềm và nước sốt càng đậm đà.</li>
              </ul>
            </section>
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
