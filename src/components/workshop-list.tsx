import { Workshop } from "./workshop-card";

// Mock data for workshops
const workshops = [
  {
    id: 1,
    title: "Cooking Basics",
    description:
      "Learn fundamental cooking techniques and how to prepare ingredients properly.",
    startTime: "2023-06-15T10:00:00",
    endTime: "2023-06-15T12:00:00",
    author: "Jane Doe",
    meetUrl: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    title: "Advanced Cooking Techniques",
    description:
      "Explore advanced cooking techniques to elevate your culinary skills.",
    startTime: "2023-06-16T14:00:00",
    endTime: "2023-06-16T16:00:00",
    author: "John Smith",
    meetUrl: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: 3,
    title: "Food Presentation & Plating",
    description:
      "Discover the art of food presentation to make your dishes visually appealing.",
    startTime: "2023-06-17T11:00:00",
    endTime: "2023-06-17T13:00:00",
    author: "Emily Johnson",
    meetUrl: "https://meet.google.com/uvw-xyza-bcd",
  },
];

export function WorkshopList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Workshops</h1>
      <div className="space-y-4">
        {workshops.map((workshop) => (
          <Workshop key={workshop.id} {...workshop} />
        ))}
      </div>
    </div>
  );
}
