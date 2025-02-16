import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
const postId = "67b065244238ccc5a7e6d15a";
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
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              🍏 Apple Crumble – Món Tráng Miệng Không Thể Bỏ Lỡ! 🔥
            </h1>

            <p className="text-gray-700 mb-4">
              Nếu bạn yêu thích những món tráng miệng ngọt ngào và dễ làm, Apple
              Crumble chính là lựa chọn hoàn hảo! Sự kết hợp giữa táo chua ngọt
              và lớp crumble giòn tan mang đến trải nghiệm vị giác khó quên. Hãy
              cùng vào bếp ngay nào!
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              🍏 Nguyên Liệu Cần Chuẩn Bị
            </h2>

            <h3 className="font-semibold text-gray-700 mt-2">Phần nhân táo:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>6 quả táo (Granny Smith hoặc táo chua nhẹ)</li>
              <li>100g đường trắng</li>
              <li>1 muỗng cà phê quế</li>
              <li>1 muỗng cà phê tinh chất vani (tùy chọn)</li>
              <li>1 muỗng canh nước cốt chanh</li>
            </ul>

            <h3 className="font-semibold text-gray-700 mt-2">Phần crumble:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>200g bột mì</li>
              <li>100g đường nâu</li>
              <li>100g bơ lạnh (cắt khối nhỏ)</li>
              <li>50g yến mạch (tùy chọn, để giòn hơn)</li>
              <li>Một nhúm muối</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              👩‍🍳 Cách Làm Apple Crumble
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>
                <strong>Chuẩn bị nhân táo:</strong>
                Gọt vỏ, bỏ hạt, cắt táo thành miếng nhỏ. Trộn với đường, quế,
                vani và nước cốt chanh. Để yên 10-15 phút.
              </li>
              <Image
                src={post.images[1]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
              <li>
                <strong>Làm phần crumble:</strong>
                Trộn bột mì, đường nâu và muối. Thêm bơ lạnh, dùng tay xoa bóp
                đến khi hỗn hợp có dạng vụn nhỏ. Có thể thêm yến mạch để tăng độ
                giòn.
              </li>
              <li>
                <strong>Lắp ráp và nướng:</strong>
                Làm nóng lò ở 180°C (350°F). Đặt táo vào khay nướng 20x20 cm,
                rải crumble lên trên. Nướng 30-35 phút đến khi vàng giòn.
              </li>
              <li>
                <strong>Thưởng thức:</strong>
                Để nguội một chút và ăn kèm kem vani hoặc sữa đặc để tăng hương
                vị! 🍦
              </li>
              <Image
                src={post.images[2]}
                alt="Limoncello"
                width={500}
                height={500}
                className="w-full h-auto pb-5"
              />
            </ol>

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              ✨ Lý Do Nên Thử Ngay Apple Crumble
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                <strong>Hương vị tuyệt vời:</strong> Táo mềm ngọt kết hợp với
                crumble giòn rụm.
              </li>
              <li>
                <strong>Dễ làm, nhanh gọn:</strong> Chỉ vài bước đơn giản, ai
                cũng có thể làm!
              </li>
              <li>
                <strong>Đầy sáng tạo:</strong> Thêm quả việt quất, mâm xôi hoặc
                hạnh nhân tùy thích.
              </li>
              <li>
                <strong>Món ăn cho mọi lứa tuổi:</strong> Trẻ em hay người lớn
                đều yêu thích! 💕
              </li>
            </ul>

            <p className="text-gray-700 mt-4">
              Bạn đã sẵn sàng thử làm Apple Crumble chưa? Hãy vào bếp ngay và
              tận hưởng món tráng miệng hoàn hảo này! 🍏✨
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
