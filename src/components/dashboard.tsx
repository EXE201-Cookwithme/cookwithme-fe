"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "./post-card-admin";
import { PostStatus } from "@/constants";
const imageUrlLimoncello = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/20230206_112140.jpg`;
// Mock data for posts
const initialPosts = [
  {
    id: 1,
    title: "First Post",
    description: "This is the first post",
    content: "Detailed content for the first post...",
    status: PostStatus.PENDING,
    imageUrl: imageUrlLimoncello,
    createdAt: "2023-06-01",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Second Post",
    description: "This is the second post",
    content: "Detailed content for the second post...",
    status: PostStatus.ACCEPTED,
    imageUrl: imageUrlLimoncello,
    createdAt: "2023-06-02",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Third Post",
    description: "This is the third post",
    content: "Detailed content for the third post...",
    status: PostStatus.REJECTED,
    imageUrl: imageUrlLimoncello,
    createdAt: "2023-06-03",
    author: "Bob Johnson",
  },
  // Add more posts as needed
];

export function Dashboard() {
  const [posts, setPosts] = useState(initialPosts);

  const filterPosts = (status: string) =>
    posts.filter((post) => post.status === status);

  const handleAccept = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: PostStatus.ACCEPTED } : post
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filterPosts("pending").map((post) => (
              <PostCard key={post.id} {...post} onAccept={handleAccept} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="accepted">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filterPosts("accepted").map((post) => (
              <PostCard key={post.id} {...post} onAccept={handleAccept} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filterPosts("rejected").map((post) => (
              <PostCard key={post.id} {...post} onAccept={handleAccept} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
