"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Minus, Maximize, Minimize, Send } from "lucide-react";
import { useListState } from "@mantine/hooks";
import { CookMessage, UserBe } from "@/constants/types";
import { toast } from "sonner";
import { useQueryData } from "@/hooks/useQueryData";

import { ScrollArea } from "./ui/scroll-area";
import Message from "./message";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UserPlan } from "@/constants";
import { set } from "react-hook-form";
import Modal from "./modal";
import PlanDetail from "./plan-detail";
import { useMutationData } from "@/hooks/useMutationData";
import Cookies from "js-cookie";
import SSO from "./sso";
const fetchConversation = async (userId: string) => {
  try {
    const handleApi = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/conversation/${userId}`,
      {
        cache: "no-cache",
      }
    );
    const res = await handleApi.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching conversation");
  }
};
const sendMessage = async (userId: string, prompt: string) => {
  try {
    const handleApi = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/conversation/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, summary: "" }),
      }
    );
    const res = await handleApi.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error sending message");
  }
};
type Props = {
  user: UserBe | null;
};
const Chatbot = ({ user }: Props) => {
  const token = Cookies.get("accessToken");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [conversation, handler] = useListState<CookMessage>([]);
  const [message, setMessage] = useState<string>("");
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  const { data, refetch } = useQueryData(["get-conversations"], () =>
    fetchConversation(user?._id as string)
  );
  const conversationData = (data as CookMessage[]) || [];
  useEffect(() => {
    if (data) {
      handler.setState(conversationData);
      scrollBottom();
    }
  }, [isChatOpen]);
  const chatSectionViewport = useRef<HTMLDivElement>(null);
  const scrollBottom = useCallback(() => {
    if (chatSectionViewport.current) {
      chatSectionViewport.current.scrollIntoView(false);
    }
  }, []);
  useEffect(() => {
    scrollBottom();
  }, [conversation]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;

    setIsBotThinking(true);
    handler.append({ role: "user", content: message });
    setMessage("");
    scrollBottom();
    try {
      const data = await sendMessage(user?._id as string, message);
      if (data) {
        handler.append({
          role: "ai",
          content: data[1].content,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Error sending message");
    } finally {
      setIsBotThinking(false);
      scrollBottom();
      refetch();
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      {!isChatOpen ? (
        <button
          className="bg-green-800 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={25} />
        </button>
      ) : (
        <>
          {!token ? (
            <Modal
              open={isChatOpen}
              onOpenChange={setIsChatOpen}
              className="max-w-sm md:max-w-md rounded-sm"
              trigger={
                <button className="bg-green-800 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition">
                  <MessageCircle size={25} />
                </button>
              }
              title="Đăng nhập để sử dụng chatbot"
              description="Vui lòng đăng nhập để truy cập chatbot Cookwithme."
            >
              <SSO />
            </Modal>
          ) : (
            <>
              {user?.plan === UserPlan.FREE ? (
                <Modal
                  open={isChatOpen}
                  onOpenChange={setIsChatOpen}
                  className="max-w-sm md:max-w-md rounded-sm"
                  trigger={
                    <button className="bg-green-800 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition">
                      <MessageCircle size={25} />
                    </button>
                  }
                  title="Gói Pro - 59,000 VND/tháng"
                  description="Mở khóa một loạt các tính năng cao cấp được thiết kế để nâng cao trải nghiệm của bạn:"
                >
                  <PlanDetail type="pro" />
                </Modal>
              ) : (
                <div
                  className={`${
                    isExpanded ? "w-96 h-[34rem]" : "w-80 h-96"
                  } bg-white shadow-2xl rounded-xl p-3 flex flex-col transition-all duration-300`}
                >
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-semibold">
                      Chuyên gia đầu bếp AI
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {isExpanded ? (
                          <Minimize size={20} />
                        ) : (
                          <Maximize size={20} />
                        )}
                      </button>

                      <button
                        onClick={() => setIsChatOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Minus size={20} />
                      </button>
                    </div>
                  </div>

                  <ScrollArea className="flex-grow">
                    <div
                      className="flex flex-col gap-4 py-3"
                      ref={chatSectionViewport}
                    >
                      {conversation.length === 0 && (
                        <Message
                          role="ai"
                          content="Chào bạn, mình là chuyên gia đầu bếp ảo của Cookwithme. Mình có thể giúp gì cho bạn?"
                        />
                      )}
                      {conversation.map((message, index) => (
                        <Message key={index} {...message} />
                      ))}
                      {isBotThinking && <Message role="ai" content="l" />}
                    </div>
                  </ScrollArea>
                  <form
                    className="px-1 pt-3 flex gap-2"
                    onSubmit={handleSendMessage}
                  >
                    <Input
                      placeholder="Nhập tin nhắn"
                      value={message}
                      onChange={handleMessageChange}
                      className="grow"
                      disabled={isBotThinking}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isBotThinking || message.trim() === ""}
                    >
                      <Send className="size-4" />
                    </Button>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Chatbot;
