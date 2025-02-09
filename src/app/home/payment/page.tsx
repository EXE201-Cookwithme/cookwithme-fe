"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);
  const pathQrImage = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/payment-qr-demo.png`;
  return (
    <section className="py-12 md:py-24 w-[60%] mx-auto">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 ">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-4xl font-bold mb-4">Free</p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Up to 3 links ads per 3 post
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                3 slot on workshop online
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Create post
              </li>
            </ul>
            <Button
              disabled
              className="mt-auto bg-green-600 hover:bg-green-700"
            >
              Current Plan
            </Button>
          </div>
          <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 ">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-4xl font-bold mb-4">
              59.000 VND
              <span className="text-base font-normal">/month</span>
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Unlimited links ads
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Advanced AI generation
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Unlimited slot on workshop online
              </li>
            </ul>
            <Modal
              open={open}
              onOpenChange={setOpen}
              className="max-w-sm md:max-w-md rounded-sm"
              trigger={
                <Button className="mt-auto bg-green-600 hover:bg-green-700">
                  Choose Plan
                </Button>
              }
              title="Payment"
              description="Please OR code payment to continue."
            >
              <Image src={pathQrImage} alt="qrcode" width={500} height={500} />
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Page;
