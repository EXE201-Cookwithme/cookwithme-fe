export enum PostStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum UserPlan {
  FREE = "free",
  PRO = "pro",
  PREMIUM = "premium",
}

export const categoryRecord: Record<string, string> = {
  Snacks: "Đồ ăn nhẹ",
  Soups: "Súp",
  "Side-dishes": "Món ăn kèm",
  Desserts: "Món tráng miệng",
  Baking: "Bánh",
  Beverages: "Đồ uống",
  "Tips-and-Techniques": "Mẹo và Kỹ thuật",
  "Product-Reviews": "Đánh giá sản phẩm",
  "Asian-Food": "Ẩm thực Châu Á",
  "Euroup-Food": "Ẩm thực Châu Âu", // Nếu "Euroup" là lỗi chính tả, sửa thành "Europe"
};
