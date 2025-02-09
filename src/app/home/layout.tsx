import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { Category } from "@/constants/types";
import { toast } from "sonner";

type Props = { children: React.ReactNode };
const fetchCategories = async () => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/category`, {
      cache: "no-cache",
    });
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching categories");
  }
};
const Layout = async ({ children }: Props) => {
  const categories: Category[] = await fetchCategories();
  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <Header categories={categories} />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
