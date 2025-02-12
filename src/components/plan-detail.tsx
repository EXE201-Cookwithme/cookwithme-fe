"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

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

const PlanDetail = () => {
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    setLoading(true);
    const checkoutUrl = await createLinkPayment();
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
            <strong>Unlimited Ads Links:</strong> Create and manage an unlimited
            number of advertising links without any restrictions.
          </p>
        </li>
        <li className="grid grid-cols-12">
          <Sparkles
            className="h-5 w-5 text-primary mr-2 col-span-1"
            color="green"
          />
          <p className="col-span-11 flex-wrap">
            <strong>Advanced AI Generation:</strong> Access powerful AI tools
            for content creation and automated processes to enhance your
            workflow.
          </p>
        </li>
        <li className="grid grid-cols-12">
          <Sparkles
            className="h-5 w-5 text-primary mr-2 col-span-1"
            color="green"
          />
          <p className="col-span-11 flex-wrap">
            <strong>Unlimited Slots for Online Workshops:</strong> Host an
            unlimited number of participants in your online workshops, ensuring
            smooth and efficient sessions for all attendees.
          </p>
        </li>
      </ul>
      <div className="z-10 flex items-center justify-center">
        <Button
          className="px-2 py-2 bg-green-700 text-white hover:bg-green-800"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Loading..." : "Register Now"}
        </Button>
      </div>
    </>
  );
};

export default PlanDetail;
