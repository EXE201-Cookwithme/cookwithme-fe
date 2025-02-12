"use client";

import { UtensilsCrossed } from "lucide-react";
import { useSearchParams } from "next/navigation";

const PaymentCancel = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const cancel = searchParams.get("cancel");
  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");

  return (
    <div className=" relative flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-7 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-red-700 mb-5">
          Payment Cancelled ❌
        </h1>
        <UtensilsCrossed size={85} className="text-red-700 animate-bounce" />
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
    </div>
  );
};

export default PaymentCancel;
