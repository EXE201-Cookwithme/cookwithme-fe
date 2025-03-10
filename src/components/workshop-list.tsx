import { Workshop } from "./workshop-card";

// Mock data for workshops
const workshops = [
  {
    id: 1,
    title: "Giao lưa chia sẻ ẩm thực",
    description:
      "khám phá ẩm thực qua góc nhìn của khách mời và các mẹo nhỏ khi nấu ăn.",
    startTime: "2025-03-06T10:00:00",
    endTime: "2025-03-06T10:45:00",
    author: "Minh Ngoc",
    meetUrl: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    title: "Kỹ thuật nấu ăn nâng cao",
    description:
      "Khám phá các kỹ thuật nấu ăn nâng cao để nâng cao kỹ năng ẩm thực của bạn.",
    startTime: "2025-04-16T14:00:00",
    endTime: "2025-04-16T16:00:00",
    author: "Van Thu",
    meetUrl: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: 3,
    title: "Trình bày & trang trí món ăn",
    description:
      "Tìm hiểu nghệ thuật trình bày món ăn để làm cho món ăn của bạn trở nên hấp dẫn hơn.",
    startTime: "2025-05-17T14:00:00",
    endTime: "2025-05-17T14:50:00",
    author: "Le Dung",
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
