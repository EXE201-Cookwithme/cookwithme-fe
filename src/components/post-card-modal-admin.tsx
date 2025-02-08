import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface PostPreviewDialogProps {
  post: {
    id: number;
    title: string;
    description: string;
    content: string;
    status: "pending" | "accepted" | "rejected";
    imageUrl: string;
    createdAt: string;
    author: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function PostPreviewDialog({
  post,
  isOpen,
  onClose,
  onAccept,
}: PostPreviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {post.title}
            <Badge
              variant={
                post.status === "accepted"
                  ? "default"
                  : post.status === "rejected"
                  ? "destructive"
                  : "secondary"
              }
            >
              {post.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>Preview of the post content</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="aspect-video relative">
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          <div>
            <h4 className="font-semibold">Description</h4>
            <p className="text-sm text-gray-500">{post.description}</p>
          </div>
          <div>
            <h4 className="font-semibold">Content</h4>
            <p className="text-sm text-gray-500">{post.content}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Created at: {post.createdAt}</span>
            <span>Author: {post.author}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {post.status === "pending" && (
            <Button onClick={onAccept}>Accept</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
