"use client";
import Header from "@/components/header";
import HeaderSlider from "@/components/header-slider";
import Modal from "@/components/modal";
import PlanDetail from "@/components/plan-detail";
import ServicePackage from "@/components/servicePackage";
import SSO from "@/components/sso";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UserPlan } from "@/constants";
import {
  BadgePlus,
  Book,
  Boxes,
  Brain,
  ChefHat,
  MonitorPlay,
  Share2,
  Sparkles,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
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
                  <CarouselItem className="basis-1/3">
                    <Card>
                      <CardHeader>
                        <CardImage
                          src="/r1.jpg"
                          className="w-[450px] object-cover"
                        ></CardImage>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">Desserts</p>
                        <p className="text-xl font-bold">
                          Decadent Cake Recipe
                        </p>
                        <p className="text-xs text-gray-500">
                          Indulge in this rich and moist chocolate cake.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-2">
                            <Avatar>
                              <AvatarImage
                                className="w-9 h-9 rounded-full"
                                src="https://github.com/shadcn.png"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="col-span-10">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-xs text-black">
                                Van Thu
                              </p>
                              <p className="text-xs">
                                <span>10 Jan 2023</span>
                                <span>2 min read</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 ">
                    <Card>
                      <CardHeader>
                        <CardImage
                          src="/r2.jpg"
                          className="w-[450px] object-cover"
                        ></CardImage>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">Cooking</p>
                        <p className="text-xl font-bold">
                          5 Quick Breakfast Ideas
                        </p>
                        <p className="text-xs text-gray-500">
                          Start your day right with these easy breakfast recipes
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-2">
                            <Avatar>
                              <AvatarImage
                                className="w-9 h-9 rounded-full"
                                src="https://github.com/shadcn.png"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="col-span-10">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-xs text-black">
                                Hong Ngoc
                              </p>
                              <p className="text-xs">
                                <span>11 Jan 2023</span>
                                <span>5 min read</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <Card>
                      <CardHeader>
                        <CardImage
                          src="/r3.jpg"
                          className="w-[450px] object-cover"
                        ></CardImage>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">Healthy</p>
                        <p className="text-xl font-bold">Easy Veggie Recipe</p>
                        <p className="text-xs text-gray-500">
                          A quick and nutritious meal packed with flavor.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-2">
                            <Avatar>
                              <AvatarImage
                                className="w-9 h-9 rounded-full"
                                src="https://github.com/shadcn.png"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="col-span-10">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-xs text-black">
                                Thang Ngo
                              </p>
                              <p className="text-xs">
                                <span>11 Jan 2023</span>
                                <span>5 min read</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <Card>
                      <CardHeader>
                        <CardImage
                          src="/r4.jpg"
                          className="w-[450px] object-cover"
                        ></CardImage>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">Cooking</p>
                        <p className="text-xl font-bold">Pad Thai Recipe</p>
                        <p className="text-xs text-gray-500">
                          Start your day right with these easy breakfast recipes
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-2">
                            <Avatar>
                              <AvatarImage
                                className="w-9 h-9 rounded-full"
                                src="https://github.com/shadcn.png"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="col-span-10">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-xs text-black">
                                Minh Ngoc
                              </p>
                              <p className="text-xs">
                                <span>11 Jan 2023</span>
                                <span>5 min read</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <Card>
                      <CardHeader>
                        <CardImage
                          src="/r5.jpg"
                          className="w-[450px] object-cover"
                        ></CardImage>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">Cooking</p>
                        <p className="text-xl font-bold">Noodle Recipes</p>
                        <p className="text-xs text-gray-500">
                          Start your day right with these easy breakfast recipes
                        </p>
                      </CardContent>
                      <CardFooter>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-2">
                            <Avatar>
                              <AvatarImage
                                className="w-9 h-9 rounded-full"
                                src="https://github.com/shadcn.png"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="col-span-10">
                            <div className="flex flex-col gap-1">
                              <p className="font-medium text-xs text-black">
                                Dung Le
                              </p>
                              <p className="text-xs">
                                <span>11 Jan 2023</span>
                                <span>5 min read</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="flex justify-center mt-5">
              <Button
                className="w-[10%] mx-5 text-md font-medium"
                variant="outline"
              >
                View All
              </Button>
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
