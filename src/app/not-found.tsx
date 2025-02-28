import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, ChefHat, Network } from "lucide-react";
import Link from "next/link";
export const runtime = "nodejs";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 text-center">
      <div className="relative mb-8">
        <ChefHat className="w-32 h-32 text-primary animate-pulse text-green-800" />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-green-800">404</h1>
      <p className="text-2xl font-semibold mb-2 text-green-800">
        Không tìm thấy trang
      </p>
      <p className="text-lg mb-8 max-w-md text-green-800">
        Trang cơ sở chưa được tạo, vui lòng quay lại trang chủ.
      </p>
      <Button
        asChild
        className="gap-2 bg-green-800 hover:bg-green-900 min-w-[12rem] max-w-[20rem] h-[4rem]"
      >
        <Link href="/">
          <p className="text-xl">Trang chủ</p>
        </Link>
      </Button>
    </div>
  );
}
