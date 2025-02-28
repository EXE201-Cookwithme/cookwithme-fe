import { Workshop } from "./workshop-card";

// Mock data for workshops
const workshops = [
  {
    id: 1,
    title: "Những điều cơ bản về nấu ăn",
    description:
      "Học các kỹ thuật nấu ăn cơ bản và cách chuẩn bị nguyên liệu đúng cách",
    startTime: "2023-06-15T10:00:00",
    endTime: "2023-06-15T12:00:00",
    author: "Jane Doe",
    meetUrl: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    title: "Kỹ thuật nấu ăn nâng cao",
    description:
      "Khám phá các kỹ thuật nấu ăn nâng cao để nâng cao kỹ năng ẩm thực của bạn.",
    startTime: "2023-06-16T14:00:00",
    endTime: "2023-06-16T16:00:00",
    author: "John Smith",
    meetUrl: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: 3,
    title: "Trình bày & trang trí món ăn",
    description:
      "Tìm hiểu nghệ thuật trình bày món ăn để làm cho món ăn của bạn trở nên hấp dẫn hơn.",
    startTime: "2023-06-17T11:00:00",
    endTime: "2023-06-17T13:00:00",
    author: "Emily Johnson",
    meetUrl: "https://meet.google.com/uvw-xyza-bcd",
  },
];

export function WorkshopList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Workshops sắp tới</h1>
      <div className="space-y-4">
        {workshops.map((workshop) => (
          <Workshop key={workshop.id} {...workshop} />
        ))}
      </div>
    </div>
  );
}
