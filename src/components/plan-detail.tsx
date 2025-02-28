"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
type Props = {
  type: "pro" | "premium";
};
const createLinkPayment = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả lập thời gian tải
  try {
    const handleData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/payment/create-payment-link`,
      {
        cache: "no-cache",
      }
    );
    const res = await handleData.json();
    console.log("Link URL:", res.checkoutUrl);
    return res.checkoutUrl;
  } catch (e) {
    console.log(e);
    toast.error("Error creating link payment");
    return null;
  }
};

const createLinkPaymentTietKiem = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả lập thời gian tải
  try {
    const handleData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/payment/create-payment-link-tiet-kiem`,
      {
        cache: "no-cache",
      }
    );
    const res = await handleData.json();
    console.log("Link URL:", res.checkoutUrl);
    return res.checkoutUrl;
  } catch (e) {
    console.log(e);
    toast.error("Error creating link payment");
    return null;
  }
};

const PlanDetail = ({ type }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleRegister = async (type: "pro" | "premium") => {
    setLoading(true);
    let checkoutUrl = "";
    if (type === "pro") {
      checkoutUrl = await createLinkPayment();
    } else if (type === "premium") {
      checkoutUrl = await createLinkPaymentTietKiem();
    }
    setLoading(false);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <>
      <ul className="flex flex-col text-xs gap-4">
        <li className="grid grid-cols-12">
          <Sparkles
            className="h-5 w-5 text-primary mr-2 col-span-1"
            color="green"
          />
          <p className="col-span-11 flex-wrap">
            <strong>Liên kết quảng cáo không giới hạn:</strong> Tạo và quản lý
            số lượng liên kết quảng cáo không giới hạn mà không có bất kỳ hạn
            chế nào.
          </p>
        </li>
        <li className="grid grid-cols-12">
          <Sparkles
            className="h-5 w-5 text-primary mr-2 col-span-1"
            color="green"
          />
          <p className="col-span-11 flex-wrap">
            <strong>Thế hệ AI tiên tiến:</strong> Truy cập các công cụ AI mạnh
            mẽ để tạo nội dung và các quy trình tự động nhằm nâng cao quy trình
            làm việc của bạn.
          </p>
        </li>
        <li className="grid grid-cols-12">
          <Sparkles
            className="h-5 w-5 text-primary mr-2 col-span-1"
            color="green"
          />
          <p className="col-span-11 flex-wrap">
            <strong>
              Số lượng chỗ ngồi không giới hạn cho các buổi hội thảo trực tuyến:
            </strong>{" "}
            Tổ chức số lượng người tham gia không giới hạn vào hội thảo trực
            tuyến của bạn, đảm bảo các buổi họp diễn ra suôn sẻ và hiệu quả cho
            tất cả người tham dự.
          </p>
        </li>
      </ul>
      <div className="z-10 flex items-center justify-center">
        <Button
          className="px-2 py-2 bg-green-700 text-white hover:bg-green-800"
          onClick={() => handleRegister(type)}
          disabled={loading}
        >
          {loading ? "Đang tải..." : "Đăng ký ngay"}
        </Button>
      </div>
    </>
  );
};

export default PlanDetail;
