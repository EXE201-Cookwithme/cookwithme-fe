import { Footer } from "@/components/footer";
import Header from "@/components/loader/header";

type Props = {
  children: React.ReactNode;
};
const Layout = async ({ children }: Props) => {
  return (
    <div className="w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
