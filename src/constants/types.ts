import { UserPlan, UserRole } from ".";

export interface Post {
  _id: string;
  images: string[];
  title: string;
  description: string;
  author: string;
  createAt: string;
  categoryId: {
    _id: string;
    name: string;
  };
  categoryName: string;
  links: string[];
}
export interface Category {
  _id: string;
  name: string;
}
export interface User {
  _id: string;
  role: UserRole;
  plan: UserPlan;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  clerkid: string;
  createdAt: Date;
}
export interface CommentPost {
  _id: string;
  userId: User;
  postId: string;
  content: string;
  createAt: string;
}