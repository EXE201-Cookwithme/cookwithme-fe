import { Footer } from "@/components/footer";
import Header from "@/components/loader/header";

type Props = { params: { postId: string }; children: React.ReactNode };

const Layout = async ({ children: childern, params: { postId } }: Props) => {
  return (
    <div className="w-full">
      <Header />
      {childern}
      <Footer />
    </div>
  );
};
export default Layout;
