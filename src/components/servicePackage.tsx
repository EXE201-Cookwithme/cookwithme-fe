"use client";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Modal from "./modal";
import SSO from "./sso";
import { UserPlan } from "@/constants";
import PlanDetail from "./plan-detail";
import { useState } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";

type Prop = {};

const ServicePackage = (props: Prop) => {
  const token = Cookies.get("accessToken") || "";
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const user = useUserStore((state) => state.user);
  return (
    <div className="container px-4 md:px-6 mx-auto">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
        Gói dịch vụ
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 ">
          <h3 className="text-2xl font-bold mb-4">Gói cơ bản</h3>
          <p className="text-4xl font-bold mb-4">Free</p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
              Tối đa 3 liên kết quảng cáo cho mỗi 3 bài đăng
            </li>
            <li className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />3
              slot trên hội thảo trực tuyến
            </li>
          </ul>
          <Button disabled className="mt-auto bg-green-600 hover:bg-green-700">
            Gói dịch vụ sẵn có
          </Button>
        </div>
        <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 ">
          <h3 className="text-2xl font-bold mb-4">Gói Pro</h3>
          <p className="text-4xl font-bold mb-4">
            59.000 VND
            <span className="text-base font-normal">/tháng</span>
          </p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
              Quảng cáo liên kết không giới hạn
            </li>
            <li className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
              Thế hệ AI tiên tiến
            </li>
            <li className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
              Không giới hạn slot trên workshop trực tuyến
            </li>
          </ul>
          {!token ? (
            <Modal
              open={open}
              onOpenChange={setOpen}
              className="max-w-sm md:max-w-md rounded-sm"
              trigger={
                <Button className="mt-auto bg-green-600 hover:bg-green-700">
                  Đăng ký ngay
                </Button>
              }
              title="Đăng nhập để đăng ký gói dịch vụ"
              description="Vui lòng đăng nhập để xác minh và đăng ký trải nghiệm dịch vụ tiện ích nhé"
            >
              <SSO />
            </Modal>
          ) : (
            <>
              {user?.plan === UserPlan.PRO ||
              user?.plan === UserPlan.PREMIUM ? (
                <Button className="mt-auto bg-green-600" disabled>
                  Bạn đã đăng ký gói dịch vụ này
                </Button>
              ) : (
                <Modal
                  open={open}
                  onOpenChange={setOpen}
                  className="max-w-sm md:max-w-md rounded-sm"
                  trigger={
                    <Button className="mt-auto bg-green-600 hover:bg-green-700">
                      Đăng ký ngay
                    </Button>
                  }
                  title="Gói Pro - 59,000 VND/tháng"
                  description="Mở khóa một loạt các tính năng cao cấp được thiết kế để nâng cao trải nghiệm của bạn:"
                >
                  <PlanDetail type="pro" />
                </Modal>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 ">
          <h3 className="text-2xl font-bold mb-4">Gói Tiết kiệm</h3>
          <p className="text-4xl font-bold">
            159.000 VND
            <span className="text-base font-bold text-red-600">/3 tháng</span>
          </p>
          <p className=" text-md text-green-600 font-bold mb-4">
            Giảm 10% so với gói PRO
          </p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
              Quảng cáo liên kết không giới hạn
            </li>
            <li className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
              Thế hệ AI tiên tiến
            </li>
            <li className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
              Không giới hạn slot trên workshop trực tuyến
            </li>
          </ul>
          {!token ? (
            <Modal
              open={open}
              onOpenChange={setOpen}
              className="max-w-sm md:max-w-md rounded-sm"
              trigger={
                <Button className="mt-auto bg-green-600 hover:bg-green-700">
                  Đăng ký ngay
                </Button>
              }
              title="Đăng nhập để đăng ký gói dịch vụ"
              description="Vui lòng đăng nhập để xác minh và đăng ký trải nghiệm dịch vụ tiện ích nhé"
            >
              <SSO />
            </Modal>
          ) : (
            <>
              {user?.plan === UserPlan.PRO ||
              user?.plan === UserPlan.PREMIUM ? (
                <Button className="mt-auto bg-green-600" disabled>
                  Bạn đã đăng ký gói dịch vụ này
                </Button>
              ) : (
                <Modal
                  open={open2}
                  onOpenChange={setOpen2}
                  className="max-w-sm md:max-w-md rounded-sm"
                  trigger={
                    <Button className="mt-auto bg-green-600 hover:bg-green-700">
                      Đăng ký ngay
                    </Button>
                  }
                  title="Gói Tiết kiệm - 159,000 VND/3 tháng"
                  description="Mở khóa một loạt các tính năng cao cấp được thiết kế để nâng cao trải nghiệm của bạn:"
                >
                  <PlanDetail type="premium" />
                </Modal>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ServicePackage;
