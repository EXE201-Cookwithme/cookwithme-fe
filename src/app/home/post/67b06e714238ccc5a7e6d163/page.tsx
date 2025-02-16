import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b06e714238ccc5a7e6d163";
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
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Spaghetti Carbonara (Ý) - Mì Ý Sốt Kem Trứng
              </h1>
              <p className="text-gray-600">
                Spaghetti Carbonara là món mì Ý cổ điển với sốt kem trứng béo
                ngậy, kết hợp cùng thịt xông khói và phô mai Parmesan, tạo nên
                hương vị tuyệt vời.
              </p>
            </header>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Nguyên liệu làm Mì Ý Carbonara (Cho 2 người)
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-48 font-medium">
                    Thịt ba chỉ xông khói
                  </span>
                  <span>250 gr</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Trứng gà</span>
                  <span>1 quả</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Kem tươi</span>
                  <span>3 muỗng canh (whipping cream)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Phô mai Parmesan</span>
                  <span>2 muỗng canh (bào vụn)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Rau mùi tây</span>
                  <span>20 gr (parsley)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Hành tây</span>
                  <span>50 gr</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Mì Ý</span>
                  <span>500 gr (dùng Linguine hoặc loài nào tùy thích)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Dầu</span>
                  <span>2 muỗng canh</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Muối</span>
                  <span>1 muỗng canh</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Tiêu</span>
                  <span>1/3 muỗng cà phê</span>
                </li>
              </ul>
            </section>

            <section className="space-y-8">
              <h2 className="text-2xl font-semibold">
                Cách chế biến Mì Ý Carbonara
              </h2>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">1. Luộc mì Ý</h3>
                <p className="text-gray-800">
                  Đun sôi một nồi nước to. Luộc mì với một chút muối, dầu ăn nấu
                  đến khi mì vừa chín tới. Dùng đũa hoặc đồ gắp mì gắp mì lên,
                  nếu nhìn thấy mì rủ xuống thành hai đường song song thì đó là
                  độ chín tới của mì. Giữ lại phần nước luộc mì. Vớt mì ra, xả
                  mì qua nước lạnh hoặc cho vào tô nước đá cho mì nguội. Cho một
                  tí dầu ăn hoặc dầu ô liu trộn đều để sợi mì không bị dính vào
                  nhau.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">
                    Mẹo luộc mì ý ngon, chuẩn
                  </h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Nấu mì trong nồi lớn, với túi mì Ý khoảng 500g bạn sẽ cần
                      4 lít nước để nấu giúp cọng mì không quấn lấy nhau.
                    </li>
                    <li>
                      Để cọng mì Ý không bị nát khi nấu bạn nên cho mì vào khi
                      nước sôi, sau 30 giây phần mì ngập trong nước sẽ bắt đầu
                      mềm, lúc này bạn dùng kẹp khuấy nhẹ cho toàn bộ mì ngập
                      trong nước.
                    </li>
                    <li>
                      Thêm dầu ăn và muối vào nước giúp sợi mì không bị dính,
                      đồng thời sợi mì đậm vị hơn.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">
                  2. Sơ chế các nguyên liệu khác
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Trứng gà đập lấy lòng đỏ sau đó đánh tan lòng đỏ với 3 muỗng
                    canh kem tươi và 2 muỗng canh phô mai, rồi để sang một bên.
                  </li>
                  <li>Thịt ba chỉ xông khói cắt miếng nhỏ vừa ăn.</li>
                  <li>Với rau mùi tây và hành tây, các bạn cắt nhỏ.</li>
                </ul>
              </div>
              <Image
                src={post.images[2]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-medium">3. Xào mì Ý</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Đun nóng 1 muỗng canh dầu trong chảo.</li>
                  <li>Cho hành tây vào xào thơm khoảng 1 – 2 phút</li>
                  <li>
                    Tiếp theo cho thịt vào đảo với hành tây và 1/3 muỗng cà phê
                    hạt tiêu.
                  </li>
                  <li>
                    Khi thịt bắt đầu săn lại thì cho mì vào xào cùng thịt.
                  </li>
                  <li>
                    Sau khi xào mì và thịt khoảng 2 - 3 phút, đủ để sợi mì tương
                    đối săn và bóng thì bắc chảo ra khỏi bếp.
                  </li>
                  <li>
                    Đợi khoảng 30 - 45 giây, thì đổ bát phô mai kem trứng vào
                    chảo.
                  </li>
                  <li>Trộn đều đến khi sợi mì thật ngấm sốt và săn bóng.</li>
                  <li>
                    Cho mùi tây vào chảo. Đảo đều lần nữa, nêm lại gia vị cho
                    vừa ăn.
                  </li>
                </ul>
                <Image
                  src={post.images[3]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-800">
                    <span className="font-medium">Lưu ý:</span> Ở bước này nếu
                    cho sốt kem trứng vào khi chảo còn quá nóng thì trứng sẽ dễ
                    chín luôn, tạo ra các lợn cợn, làm món ăn không được đẹp
                    mắt. Vì thế, nên đợi khoảng 30 - 45 giây mới đổ bát pho mát
                    kem trứng chuẩn bị vào chảo nhé.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">4. Thành phẩm</h3>
                <p className="text-gray-800">
                  Vậy là chỉ với vài bước đơn giản bạn đã có ngay dĩa mì Ý
                  Carbonara thơm ngon, béo ngậy, sợi mì dai dai không bị bở kết
                  hợp cùng thịt xông khói thơm lừng, đậm đà vô cùng hấp dẫn.
                  Cùng vào bếp trổ tài ngay để chiêu đãi gia đình mình nhé!
                </p>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Mẹo nấu ngon</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Không dùng kem tươi để giữ hương vị truyền thống.</li>
                <li>
                  Dùng nhiệt độ mì nóng để làm chín trứng, tránh tạo vón cục.
                </li>
              </ul>
            </section>
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
