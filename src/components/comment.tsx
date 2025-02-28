"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useQueryData } from "@/hooks/useQueryData";
import { toast } from "sonner";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useMutationData } from "@/hooks/useMutationData";
import Loader from "./loader";
import { formatDate } from "@/lib/utils";
import { CommentPost, UserBe } from "@/constants/types";
import SSO from "./sso";

type Props = {
  postId: string;
  user: UserBe | null;
};
const fetchComments = async (postId: string) => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/comment/${postId}`,
      {
        cache: "no-cache",
      }
    );
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching comments");
  }
};

const createComment = async (
  userId: string,
  postId: string,
  content: string
) => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/comment/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          postId,
        }),
      }
    );
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error create comments");
  }
};
const Comment = ({ postId, user }: Props) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(Cookies.get("accessToken") || "");
  }, []);
  const { data } = useQueryData(["get-comments"], () => fetchComments(postId));
  const comments = (data as CommentPost[]) || [];
  const [commentText, setCommentText] = useState("");
  const { mutate, isPending } = useMutationData(
    ["create-comment"],
    (data: { userId: string; postId: string; content: string }) =>
      createComment(data.userId, data.postId, data.content),
    "get-comments"
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    mutate(
      { userId: user?._id, postId, content: commentText },
      {
        onSuccess: () => {
          toast.success("Comment added successfully!");
          setCommentText(""); // Xóa input sau khi gửi thành công
        },
      }
    );
  };
  return (
    <div>
      <div className="text-2xl font-semibold">
        {comments.length ?? 0} bình luận
      </div>
      {comments.length > 0
        ? comments.map((comment, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-12 my-4 border-2 border-black border-opacity-10 rounded-md"
              >
                <div className="col-span-10">
                  <div className="bg-white rounded-sm p-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2 justify-start items-center flex-wrap">
                        <div>
                          <Image
                            src={comment.userId.image}
                            width={30}
                            height={30}
                            alt="user image"
                            className="rounded-full"
                          />
                        </div>
                        <span className="font-bold">{`${comment.userId.firstname} ${comment.userId.lastname}`}</span>{" "}
                        -
                        <span className="text-gray-700 text-sm">
                          {" "}
                          {formatDate(comment.createAt)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : "No comments"}

      {!token ? (
        <div className="grid grid-rows-2 gap-3">
          <div className="col-span-1 font-bold md:text-xl text-md">
            Đăng nhập để bình luận:
          </div>
          <div className="col-span-1 w-[90%] flex justify-center">
            <SSO />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-[87%] flex lg:flex-row gap-2 p-5 bg-white rounded-sm xs:flex-wrap"
        >
          <Input
            className="outline-none"
            placeholder="Hãy tương tác với bài viết nào..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isPending}
          />
          <Button type="submit">
            <Loader state={isPending}>Gửi</Loader>
          </Button>
        </form>
      )}
    </div>
  );
};

export default Comment;
