"use client";

import { Confetti, ConfettiRef } from "@/components/magicui/confetti";
import { UserBe } from "@/constants/types";
import { useUserStore } from "@/store/userStore";
import { CircleCheckBig } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
const updatePlanUser = async (userId: string) => {
  try {
    const handleApi = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/user/plan/${userId}`
    );
    const res = await handleApi.json();
    console.log("Update plan user: ", res.data);
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error updating plan user");
  }
};

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const cancel = searchParams.get("cancel");
  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");
  const confettiRef = useRef<ConfettiRef>(null);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const updatePlan = async () => await updatePlanUser(user?._id as string);
    updatePlan();
  }, [user]);
  return (
    <div className=" relative flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-7 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-5">
          Payment Successful 🎉
        </h1>
        <CircleCheckBig size={85} className="text-green-700 animate-bounce" />
        <div className=" flex flex-col gap-8 flex-wrap py-6 text-sm md:text-md lg:text-lg ">
          <p>
            <strong>Transaction ID:</strong> {id}
          </p>
          <p>
            <strong>Cancelled:</strong> {cancel}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Order Code:</strong> {orderCode}
          </p>
        </div>
      </div>
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </div>
  );
};

export default PaymentSuccess;
