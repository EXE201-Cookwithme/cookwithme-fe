"use client";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Button } from "./ui/button";
import LoadingDots from "./loading-dots";
import Cookies from "js-cookie";
const LoginGoogle = () => {
  const [loading, setLoading] = useState(false);
  const loginGoogle = useGoogleLogin({
    onSuccess: async (responseGoogle) => {
      console.log("Login Success:", responseGoogle);
      const token: string = responseGoogle.access_token;
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BE}/user/login2`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken: token }),
          }
        );
        if (response.ok) {
          const dataResponse = await response.json();
          const accessToken = dataResponse.data.accessToken;
          if (accessToken) {
            Cookies.set("accessToken", accessToken);
            console.log("Đã lưu access token vào cookie");
            window.location.reload();
          } else {
            console.error("Không nhận được accessToken từ API");
          }
        } else {
          console.error("Lỗi khi gọi API:", await response.text());
        }
      } catch (error) {
        console.error("Lỗi xử lý đăng nhập:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <div
      className="rounded-lg py-1 px-4 bg-white text-black hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={() => loginGoogle()}
    >
      {loading ? "Đang xử lý..." : "Login"}
    </div>
  );
};

export default LoginGoogle;
