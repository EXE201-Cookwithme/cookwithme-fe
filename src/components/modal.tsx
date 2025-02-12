import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const Modal = ({
  children,
  description,
  title,
  trigger,
  className,
  ...props
}: Props) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-xs">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
