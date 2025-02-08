import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, UserIcon, VideoIcon } from "lucide-react";

interface WorkshopProps {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  author: string;
  meetUrl: string;
}

export function Workshop({
  title,
  description,
  startTime,
  endTime,
  author,
  meetUrl,
}: WorkshopProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {new Date(startTime).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {new Date(startTime).toLocaleTimeString()} -{" "}
              {new Date(endTime).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">{author}</span>
          </div>
          <div className="flex items-center">
            <VideoIcon className="h-4 w-4 mr-2" />
            <Button variant="link" className="p-0 h-auto" asChild>
              <a href={meetUrl} target="_blank" rel="noopener noreferrer">
                Join Meet
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
