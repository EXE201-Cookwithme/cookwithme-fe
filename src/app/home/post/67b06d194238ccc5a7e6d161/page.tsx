import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67b06d194238ccc5a7e6d161";
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
                Beef Wellington (Anh 🇬🇧) 🥩🥐
              </h1>
              <p className="text-gray-600">
                Beef Wellington là món ăn cổ điển của Anh, gồm thăn bò mềm bọc
                trong lớp pate nấm và bột ngàn lớp (puff pastry), tạo nên hương
                vị thơm ngon và kết cấu giòn rụm.
              </p>
            </header>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Nguyên liệu làm Bò Wellington (Cho 4 người)
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-48 font-medium">Thăn bò</span>
                  <span>500 gr (nguyên miếng)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Nấm mỡ</span>
                  <span>500 gr</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Bột mì đa dụng</span>
                  <span>50 gr</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Sữa tươi không đường</span>
                  <span>120 ml</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Bột bánh ngàn lớp</span>
                  <span>2 miếng (pastry puff)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Trứng gà</span>
                  <span>2 quả</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Tỏi băm</span>
                  <span>1 muỗng canh</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Hành tím băm</span>
                  <span>2 muỗng canh</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Mù tạt vàng</span>
                  <span>3 muỗng canh</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Dầu oliu</span>
                  <span>4 muỗng canh</span>
                </li>
                <li className="flex items-start">
                  <span className="w-48 font-medium">Muối/tiêu</span>
                  <span>1 ít</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Cách chọn mua nguyên liệu tươi ngon
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Cách chọn mua thịt thăn bò
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Đối với món bò Wellington bạn nên chọn thịt thăn nội hay
                      còn gọi là thăn chuột được lấy từ lưng phần lưng phía
                      trong của bò, nhất là phần cuối lưng nên khi nấu món ăn sẽ
                      có vị ngậy, mềm ngọt và thơm đúng chuẩn hơn.
                    </li>
                    <li>
                      Thịt tươi ngon là miếng thịt có màu đỏ tươi, thớ thịt nhỏ
                      mịn, thơm mùi bò, mỡ có màu vàng nhạt và hơi cứng.
                    </li>
                    <li>
                      Dùng ngón tay ấn nhẹ vào thớ thịt cảm nhận được độ đàn hồi
                      tốt của thịt. Nếu thấy không bị dính tay và không có mùi
                      hôi thì bạn có thể chọn được loại thịt bò tươi ngon để chế
                      biến các món ăn rồi đấy.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Cách chọn mua nấm mỡ ngon
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Bạn nên chọn nấm có màu trắng vì khi nấu các món súp, cháo
                      thì nấm sẽ có vị ngon hơn.
                    </li>
                    <li>Chân nấm ngắn, mũ tròn và đều.</li>
                    <li>
                      Kích thước nấm nên vừa tay, tránh chọn kích thước quá to
                      hoặc quá nhỏ.
                    </li>
                    <li>Không chọn nấm có mùi hôi hay xuất hiện mùi lạ.</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                Lưu ý: Bột bánh ngàn lớp bạn có thể tự làm tại nhà hoặc có thể
                mua loại làm sẵn trên các trang thương mại điện tử để tiết kiệm
                thời gian.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Dụng cụ thực hiện</h2>
              <p>Lò nướng, chảo, màng bọc thực phẩm,...</p>
            </section>

            <section className="space-y-8">
              <h2 className="text-2xl font-semibold">
                Cách chế biến Bò Wellington
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    1. Sơ chế thịt thăn bò
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Thịt bò sau khi mua về rửa sạch, để ráo nước, dùng khăn
                      giấy hoặc khăn khô để lau và thấm khô miếng bò.
                    </li>
                    <li>
                      Ướp thịt bò với 1 muỗng cà phê muối, 1 muỗng cà phê tiêu,
                      thoa đều 2 mặt và ướp trong khoảng 20 phút cho thịt thấm
                      gia vị.
                    </li>
                  </ul>
                  <p className="mt-2 text-gray-600">
                    Mách bạn: Bạn có thể ướp thêm với ít lá thảo mộc như lá
                    thyme, rosemary hoặc tỏi băm để giúp thịt bò thơm hơn.
                  </p>
                </div>
                <Image
                  src={post.images[1]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">2. Sơ chế nấm mỡ</h3>
                  <p>
                    Nấm mỡ bạn cắt phần chân dơ, rửa sạch lại với nước và để
                    ráo. Sau đó, thái thành các lát mỏng rồi băm nấm cho thật
                    nhỏ.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Mách nhỏ: Bạn có thể sử dụng phối hợp các loại nấm khác nhau
                    như nấm mỡ với nấm đông cô, các loại nấm rừng,... để có thể
                    mang đến nhiều hương vị hơn.
                  </p>
                </div>
                <Image
                  src={post.images[2]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">3. Xào nhân nấm</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Cho hành tím băm, tỏi băm, 2 muỗng canh dầu oliu vào chảo.
                      Kế đến bắc chảo lên bếp, phi thơm trên lửa vừa.
                    </li>
                    <li>
                      Sau đó đổ hết phần nấm băm nhỏ vào chảo. Nêm thêm 1 muỗng
                      cà phê muối, 1 muỗng cà phê tiêu, trộn đều và xào khoảng 5
                      phút đến khi nấm chín, cạn nước thấy hơi khô thì tắt bếp.
                    </li>
                  </ul>
                  <p className="mt-2 text-gray-600">
                    Mách bạn: Để phần nhân nấm thêm hấp dẫn, bạn có thể cho thêm
                    khoảng 3 muỗng canh rượu trắng hoặc bơ đun chảy vào xào cùng
                    nhé.
                  </p>
                </div>
                <Image
                  src={post.images[3]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    4. Áp chảo thịt thăn
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Bắc chảo lên bếp, cho vào chảo khoảng 2 muỗng canh dầu
                      oliu, để lửa vừa. Khi chảo nóng thì cho thịt bò vào áp
                      chảo khoảng 1 phút rồi lật sang mặt còn lại.
                    </li>
                    <li>
                      Tương tự với các cạnh của miếng bò bạn cũng áp chảo trong
                      vòng 1 phút đến khi miếng thịt chuyển sang màu sẫm thì tắt
                      bếp, gắp thịt bò ra dĩa.
                    </li>
                    <li>
                      Tiếp theo, dùng cọ quết một lớp mỏng mù tạt vàng lên khắp
                      miếng bò.
                    </li>
                  </ul>
                  <p className="mt-2 text-gray-600">
                    Lưu ý: Áp chảo vừa đủ thời gian để thịt đạt được độ chín
                    hoàn hảo, bên trong vẫn còn màu hồng mà bên ngoài không bị
                    cháy.
                  </p>
                </div>
                <Image
                  src={post.images[4]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    5. Làm bánh crepe
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Cho 50gr bột mì đa dụng, 120ml sữa tươi, 1 quả trứng gà
                      vào âu trộn. Sau đó, đánh tan trứng và trộn đều bột bánh
                      lại với nhau đến khi hỗn hợp mịn, mượt.
                    </li>
                    <li>
                      Bạn có thể sử dụng lại chảo đã chiên bò lúc nãy, quết nhẹ
                      một lớp mỏng dầu oliu để bánh không dính vào mặt chảo.
                    </li>
                    <li>
                      Đổ một ít bột bánh vào chảo, dàn đều ra mặt chảo. Để
                      khoảng 1 - 2 phút thì lật mặt bánh lại để thêm 1 - 2 phút
                      nữa cho, vỏ bánh vàng đều thì xếp ra dĩa. Lặp lại như vậy
                      đến khi hết bột.
                    </li>
                  </ul>
                </div>
                <Image
                  src={post.images[5]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    6. Chuẩn bị lớp crepe cuốn thịt bò
                  </h3>
                  <p>
                    Xếp chồng 2 lớp bánh crepe lên tấm thớt. Lấy một ít hỗn hợp
                    nhân nấm, trải đều lên lớp bánh crepe.
                  </p>
                </div>
                <Image
                  src={post.images[6]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    7. Cuộn crepe và thịt bò
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Đặt thịt thăn bò lên trên lớp crepe đã chuẩn bị lúc nãy.
                      Sau đó cuộn tròn từ từ lớp crepe và thịt bò lại với nhau.
                    </li>
                    <li>
                      Kế đến dùng màng bọc thực phẩm bọc lại và siết chặt 2 đầu
                      của màng bọc lại. Lăn thêm vài vòng lên thớt để giữ phom
                      của khối thịt.
                    </li>
                    <li>
                      Cho khối thịt vào trong ngăn mát tủ lạnh khoảng 30 phút.
                    </li>
                  </ul>
                </div>
                <Image
                  src={post.images[7]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    8. Cuốn vỏ bánh ngàn lớp
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Trải lên thớt vỏ bánh ngàn lớp, dùng cọ quết một lớp mỏng
                      lòng đỏ trứng gà lên vỏ bánh.
                    </li>
                    <li>
                      Lấy khối thịt ra khỏi màng bọc thực phẩm. Rồi đặt lên trên
                      vỏ bánh, cuộn lại đến khi vỏ bánh bọc hết khối thịt là
                      được.
                    </li>
                    <li>Bạn có thể dùng dao cắt phần bánh dư ở 2 đầu.</li>
                    <li>
                      Cuối cùng quết thêm một lớp trứng gà ở xung quanh lớp vỏ.
                    </li>
                  </ul>
                </div>
                <Image
                  src={post.images[8]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    9. Làm lớp vỏ lưới
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Miếng bột bánh ngàn lớp còn lại bạn cắt thanh dài, sau đó
                      xếp chéo xen kẽ nhau để tạo hình lưới lên mặt bánh.
                    </li>
                    <li>Bạn rắc đều 1 ít muối lên mặt bánh.</li>
                  </ul>
                </div>
                <Image
                  src={post.images[9]}
                  alt="Limoncello"
                  width={500}
                  height={500}
                  className="w-full h-auto pb-5"
                />

                <div>
                  <h3 className="text-xl font-medium mb-2">10. Nướng món ăn</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Làm nóng lò ở nhiệt độ 180 độ C trong 10 phút để nhiệt độ
                      lò ổn định. Lót một lớp giấy nến lên khay nướng rồi đặt
                      khối bánh lên trên giấy.
                    </li>
                    <li>
                      Sau khi làm nóng lò, cho khối bánh vào nướng ở nhiệt độ
                      khoảng 220 độ C trong 40 phút cho bánh chín vàng.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">11. Thành phẩm</h3>
                  <p>
                    Lớp vỏ giòn, thêm chút mằn mặn của muối được rắc lên trên.
                    Khi cắt miếng bánh ra, bạn sẽ thấy thịt bò bên trong vẫn còn
                    giữ được độ ẩm và hồng.
                  </p>
                  <p className="mt-2">
                    Thịt bò thì mềm, nêm nếm vừa phải, mù tạt vàng còn giúp cho
                    thịt bò có vị cay nồng, chua nhẹ ăn cùng với lớp nấm dai
                    dai, sừn sựt. Thật không hổ danh là ông vua trên bàn tiệc
                    đúng không nào!
                  </p>
                </div>
              </div>
            </section>

            <footer className="mt-8">
              <h3 className="text-xl font-medium mb-2">📌 Mẹo nhỏ:</h3>
              <p>
                Để thịt bò nghỉ sau nướng giúp nước thịt không bị chảy ra ngoài
                khi cắt.
              </p>
            </footer>
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
