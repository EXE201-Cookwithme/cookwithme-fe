"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categoryRecord } from "@/constants";
import { Post } from "@/constants/types";
import { useDebounce } from "@/hooks/useDebouce";
import { formatDate } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const runtime = "nodejs";

// Hàm fetch posts với tham số tìm kiếm
const fetchAllPost = async (keyword?: string) => {
  try {
    // Xây dựng URL với tham số tìm kiếm nếu có
    let url = `${process.env.NEXT_PUBLIC_BE}/post`;
    if (keyword) {
      url += `?keyword=${encodeURIComponent(keyword)}`;
    }

    const fetchData = await fetch(url, {
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
    return [];
  }
};

// Hook debounce

// Chuyển sang client component để sử dụng useState và useEffect
const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Áp dụng debounce cho search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch posts khi component mount hoặc khi debouncedSearchTerm thay đổi
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllPost(debouncedSearchTerm);
        setPosts(data || []);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
        toast.error("Không thể tải bài viết");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [debouncedSearchTerm]);

  // Xử lý thay đổi input tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="flex-1">
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
          <div className="text-center text-3xl font-bold p-4">Đang tải...</div>
        )}

        {/* Hiển thị thông báo không có kết quả */}
        {!isLoading && posts.length === 0 && (
          <div className="text-center font-bold text-3xl p-4">
            Không tìm thấy bài viết nào
          </div>
        )}

        {/* Danh sách bài viết */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {posts.map((post, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardImage
                    src={post.images[0]}
                    className="w-full h-[230px] object-cover"
                  ></CardImage>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="destructive">
                    <p className="text-xs font-medium">
                      {categoryRecord[post.categoryName]}
                    </p>
                  </Badge>
                  <p className="text-xl font-bold">{post.title}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {post.description}
                  </p>
                  <p className="text-xs">
                    <span>
                      {formatDate(post.createAt)} by {post.author}
                    </span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`home/post/${post._id}`}>
                    <Button variant={"outline"}>Xem chi tiết</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Page;
