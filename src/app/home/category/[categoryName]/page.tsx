"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { Rabbit, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Post } from "@/constants/types";
import { categoryRecord } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Props = {
  params: {
    categoryName: string;
  };
};

// Hook debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hàm fetch posts theo categoryName và keyword
const fetchPostByCategoryName = async (
  categoryName: string,
  keyword?: string
) => {
  try {
    // Bắt đầu với URL cơ bản
    let url = `${process.env.NEXT_PUBLIC_BE}/post`;

    // Tạo mảng các tham số query
    const queryParams = [];

    // Thêm categoryName vào query params
    if (categoryName) {
      queryParams.push(`categoryName=${encodeURIComponent(categoryName)}`);
    }

    // Thêm keyword vào query params nếu có
    if (keyword) {
      queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
    }

    // Nối các query params vào URL
    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    const fetchData = await fetch(url, {
      cache: "no-cache",
    });

    const res = await fetchData.json();
    return res.data.map((post: Post) => {
      return {
        ...post,
        images: post.images.map(
          (img: string) =>
            `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${img}`
        ),
      };
    });
  } catch (e) {
    console.log(e);
    toast.error("Error fetching posts");
    return [];
  }
};

const Page = ({ params: { categoryName } }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Áp dụng debounce cho search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch posts khi component mount hoặc khi debouncedSearchTerm thay đổi
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPostByCategoryName(
          categoryName,
          debouncedSearchTerm
        );
        setPosts(data || []);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
        toast.error("Không thể tải bài viết");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [categoryName, debouncedSearchTerm]);

  // Xử lý thay đổi input tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="mx-auto w-[80%] py-8">
      {/* Thanh tìm kiếm */}
      <div className="flex justify-center mb-6">
        <div className="relative md:w-3xl w-full max-w-3xl">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Search size={20} />
          </div>
          <Input
            autoFocus
            type="text"
            placeholder="Tìm kiếm theo tiêu đề..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 w-full border-1 border-gray-300 focus:border-gray-200 rounded-lg transition-all duration-200 min-h-12 text-lg"
          />
        </div>
      </div>

      {/* Hiển thị trạng thái đang tải */}
      {isLoading && (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[16rem]">
          <p className="text-xl italic text-center">Đang tải...</p>
        </div>
      )}

      {/* Danh sách bài viết */}
      {!isLoading && posts.length > 0 && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {posts.map((p, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardImage
                    src={p.images[0]}
                    className="w-full h-[230px] object-cover"
                  ></CardImage>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="destructive">
                    <p className="text-xs font-medium">
                      {categoryRecord[p.categoryId.name]}
                    </p>
                  </Badge>
                  <p className="text-xl font-bold">{p.title}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {p.description}
                  </p>
                  <p className="text-xs">
                    <span>
                      {formatDate(p.createAt)} by {p.author}
                    </span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/home/post/${p._id}`}>
                    <Button variant={"outline"}>Xem chi tiết</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Hiển thị thông báo không có bài viết */}
      {!isLoading && posts.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[16rem]">
          <Rabbit className="animate-bounce lg:size-38 md:size-20 size-10" />
          <p className="text-xl italic text-center">
            Hiện tại không có bài viết ...
          </p>
        </div>
      )}
    </section>
  );
};

export default Page;
