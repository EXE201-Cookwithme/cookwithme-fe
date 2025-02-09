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
import { Rabbit } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Post } from "@/constants/types";
type Props = {
  params: {
    categoryName: string;
  };
};
const fetchPostByCategoryName = async (categoryName: string) => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/post/category/${categoryName}`,
      {
        cache: "force-cache",
      }
    );
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
    toast.error("Error fetching post by category id");
  }
};
const Page = async ({ params: { categoryName } }: Props) => {
  const posts: Post[] = (await fetchPostByCategoryName(categoryName)) || [];
  return (
    <section className="mx-auto w-[80%] py-8">
      <div className="text-3xl font-bold p-5">
        Category: {categoryName.split("-").join(" ")}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {posts.length > 0 &&
          posts.map((p, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardImage
                    src={p.images[index]}
                    className="w-[400px] h-[230px] object-cover"
                  ></CardImage>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm font-medium">{p.categoryId.name}</p>
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
                    <Button variant={"outline"}>Read more</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
      </div>
      {posts.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[16rem]">
          <Rabbit className="animate-bounce lg:size-38 md:size-20 size-10" />
          <p className="text-xl italic text-center">No posts ...</p>
        </div>
      )}
    </section>
  );
};
export default Page;
