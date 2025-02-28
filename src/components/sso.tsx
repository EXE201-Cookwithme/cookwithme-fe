"use client";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
const SSO = () => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
  const handleLogin = async (token: string) => {
    try {
      // Gọi API để xác thực token từ Google và lấy access token từ backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BE}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
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
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token: string = credentialResponse.credential || "";
          handleLogin(token);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default SSO;
