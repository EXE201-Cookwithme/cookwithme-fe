"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostPreviewDialog } from "./post-card-modal-admin";
import { PostStatus } from "@/constants";

interface PostCardProps {
  id: number;
  title: string;
  description: string;
  content: string;
  status: PostStatus;
  imageUrl: string;
  createdAt: string;
  author: string;
  onAccept: (id: number) => void;
}

export function PostCard(props: PostCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{props.title}</span>
            <Badge
              variant={
                props.status === "accepted"
                  ? "default"
                  : props.status === "rejected"
                  ? "destructive"
                  : "secondary"
              }
            >
              {props.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video relative mb-4">
            <img
              src={props.imageUrl || "/placeholder.svg"}
              alt={props.title}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          <p className="text-sm text-gray-500">{props.description}</p>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsPreviewOpen(true)}
          >
            Preview
          </Button>
        </CardFooter>
      </Card>
      <PostPreviewDialog
        post={props}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onAccept={() => {
          props.onAccept(props.id);
          setIsPreviewOpen(false);
        }}
      />
    </>
  );
}
