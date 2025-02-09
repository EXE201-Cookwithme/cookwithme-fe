import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
} from "@/components/ui/card";
import Link from "next/link";
type Props = {
  params: {
    categoryId: string;
  };
};
const Page = ({ params: { categoryId } }: Props) => {
  const imageUrlLimoncello = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/20230206_112140.jpg`;
  return (
    <section className="mx-auto w-[80%] py-8">
      <div className="text-3xl font-bold p-5">Category: {categoryId}</div>
      <div className="grid grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardImage
                  src={imageUrlLimoncello}
                  className="w-[400px] h-[230px] object-cover"
                ></CardImage>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm font-medium">Desserts</p>
                <p className="text-xl font-bold">Decadent Cake Recipe</p>
                <p className="text-xs text-gray-500 truncate">
                  Indulge in this rich and moist chocolate cake.
                </p>
                <p className="text-xs">
                  <span>10 Jan 2023</span>
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/post/123456">
                  <Button variant={"outline"}>Read more</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
export default Page;
