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
export const runtime = "nodejs";
export interface Post {
  _id: string;
  images: string[];
  title: string;
  description: string;
  author: string;
  createAt: string;
  categoryId: {
    _id: string;
    name: string;
  };
  categoryName: string;
  links: string[];
}
const fetchAllPost = async () => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/post`, {
      cache: "force-cache",
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

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Page = async () => {
  const posts: Post[] = await fetchAllPost();
  return (
    <main className="flex-1">
      <section className="mx-auto w-[80%] py-8">
        <div className="text-3xl font-bold p-5">Recent articles</div>
        <div className="grid grid-cols-3 gap-6">
          {posts.map((post, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardImage
                    src={post.images[index]}
                    className="w-[400px] h-[230px] object-cover"
                  ></CardImage>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm font-medium">{post.categoryId.name}</p>
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
                    <Button variant={"outline"}>Read more</Button>
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
