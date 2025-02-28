import HeaderSlider from "@/components/header-slider";
import ServicePackage from "@/components/servicePackage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardImage } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categoryRecord } from "@/constants";
import { Post } from "@/constants/types";
import { Book, Boxes, Brain, ChefHat, MonitorPlay, Share2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const fetchAllPost = async () => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/post`, {
      cache: "no-cache",
    });
    const res = await fetchData.json();
    return res.data.map((post: Post) => ({
      ...post,
      images: post.images.map(
        (img) => `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${img}`
      ),
    }));
  } catch (e) {
    console.log(e);
    toast.error("Error fetching posts");
  }
};
const Page = async () => {
  const posts: Post[] = await fetchAllPost();

  const imageSlider = {
    1: `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/f1.png`,
    3: `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/f3.png`,
    4: `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/f4.png`,
  };
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <HeaderSlider />
      <main className="flex-1">
        <section id="about" className="bg-green-900 py-8 pt-12">
          <div className="grid grid-cols-12 w-[80%] mx-auto pb-10">
            <div className="col-span-5">
              <div className="flex flex-col ">
                <div className="text-white font-bold lg:text-4xl md:text-2xl text-2xl w-[80%] leading-tight">
                  Cách nhanh nhất để có những công thức nấu ăn đơn giản và chất
                  lượng
                </div>
                <div className="md:text-md text-xs text-gray-200 py-6 w-[90%]">
                  Khám phá hơn 1000 công thức nấu ăn trong tay bạn với những
                  công thức nấu ăn tuyệt vời nhất. Giúp bạn tìm ra cách nấu ăn
                  dễ nhất.
                </div>
                <Link href="/home">
                  <Button className="lg:w-[40%] md:w-[60%] w-full md:text-md text-sm bg-green-600 hover:bg-green-700 mb-6">
                    Khám phá ngay thôi !
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col-span-7 flex md:flex-row flex-col justify-center items-center">
              <Image
                src={imageSlider[3]}
                width={300}
                height={300}
                alt="food3"
                className="md:absolute md:top-[100px] md:left-[40%] md:w-[300px] md:h-[300px] w-[150px] h-[150px]"
              />
              <Image
                src={imageSlider[1]}
                width={400}
                height={400}
                alt="food2"
                className="md:absolute top-[70px] md:w-[400px] md:h-[400px] w-[150px] h-[150px]"
              />
              <Image
                src={imageSlider[4]}
                width={320}
                height={320}
                alt="food2"
                className="md:absolute top-[110px] right-[5%] md:w-[320px] md:h-[320px] w-[150px] h-[150px]"
              />
            </div>
          </div>
        </section>
        <section id="features">
          <div className="bg-white flex flex-col py-12 mx-auto w-[90%]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Chức năng
            </h2>
            <div className="grid grid-rows-2 gap-10">
              <div className="row-span-1">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <Brain color="green" size={48} />
                      <h2 className="text-2xl font-bold">
                        Sức mạnh của AI tạo ra
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Tạo một chatbot chuyên gia nấu ăn giúp trả lời các câu
                        hỏi.
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <Book color="green" size={48} />
                      <h2 className="text-2xl font-bold">Nội dung thực phẩm</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Biên soạn các bài viết chất lượng cao về thực phẩm để hỗ
                        trợ những người đam mê nấu ăn.
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <Boxes color="green" size={48} />
                      <h2 className="text-2xl font-bold">Cộng đồng nấu ăn</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Một cộng đồng chia sẻ kiến ​​thức về công thức nấu ăn và
                        mẹo nấu ăn hàng ngày từ bạn bè trên khắp thế giới.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-span-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <MonitorPlay color="green" size={48} />
                      <h2 className="text-2xl font-bold">Workshop online</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Buổi học trực tuyến về chủ đề nấu ăn do các chuyên gia
                        ẩm thực tổ chức.
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <Share2 color="green" size={48} />
                      <h2 className="text-2xl font-bold">Chia sẻ dễ dàng</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Chia sẻ bài viết với gia đình và bạn bè trên nhiều nền
                        tảng khác nhau.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="recipes">
          <div className="w-full flex flex-col gap-4 justify-center mx-auto bg-green-900 py-20">
            <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Khám phá công thức nấu ăn mới nhất của chúng tôi
            </h2>
            <div className="flex justify-center">
              <Carousel className="w-[60%] ">
                <CarouselContent>
                  {posts.map((post, index) => (
                    <CarouselItem
                      key={index}
                      className="lg:basis-1/3 md:basis-1/2 basis"
                    >
                      <Link href={`/home/post/${post._id}`}>
                        <Card className="h-[400px] rounded-xl grid grid-rows-1">
                          <CardHeader className="grid-rows-6 ">
                            <CardImage
                              src={post.images[0]}
                              className="max-w-[450px] min-h-[200px] object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                            ></CardImage>
                          </CardHeader>
                          <CardContent className="grid-rows-6">
                            <Badge variant="destructive">
                              <p className="text-xs font-medium">
                                {categoryRecord[post.categoryName]}
                              </p>
                            </Badge>
                            <p className="text-sm font-bold py-1">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-4">
                              {post.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="flex justify-center mt-5">
              <Link href="/home">
                <Button className=" mx-5 text-md font-medium" variant="outline">
                  Xem thêm
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="pricing" className="py-12 md:py-24 max-w-[80%] mx-auto">
          <ServicePackage />
        </section>
      </main>
      <footer className="bg-green-900">
        <div className="container py-10 w-[80%] mx-auto">
          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-2 text-white">
                <ChefHat size={32} />
                <h2 className="font-bold text-xl">Cookwithme</h2>
              </div>
              <div className="text-gray-400 mt-4 text-sm w-[40%] text-justify">
                Khám phá hơn 1000 công thức nấu ăn trong tay bạn với công thức
                nấu ăn tuyệt vời nhất. Giúp bạn tìm ra công thức nấu ăn dễ nhất.
              </div>
            </div>
            <div className="w-[40%]">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="col-span-1">
                  <ul>
                    <li>
                      <h2 className="font-bold text-lg text-white">Menu</h2>
                    </li>
                    <li>
                      <Link
                        href="#about"
                        className="text-slate-400 hover:text-white"
                      >
                        Chi tiết
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#features"
                        className="text-slate-400  hover:text-white"
                      >
                        Chức năng
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#recipes"
                        className="text-slate-400  hover:text-white"
                      >
                        Công thức
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#pricing"
                        className="text-slate-400  hover:text-white tracking-wide"
                      >
                        Gói dịch vụ
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-span-1">
                  <ul>
                    <li>
                      <h2 className="font-bold text-lg text-white">Help</h2>
                    </li>
                    <li>
                      <Link
                        href="#about"
                        className="text-slate-400 hover:text-white"
                      >
                        Privary
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#about"
                        className="text-slate-400  hover:text-white"
                      >
                        Term of Use
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-span-1">
                  <ul>
                    <li>
                      <h2 className="font-bold text-lg text-white">Social</h2>
                    </li>
                    <li>
                      <Link
                        href="https://www.facebook.com/profile.php?id=61571498144685"
                        className="text-slate-400 hover:text-white"
                      >
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#about"
                        className="text-slate-400  hover:text-white"
                      >
                        Instagram
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#about"
                        className="text-slate-400  hover:text-white"
                      >
                        Twitter
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
