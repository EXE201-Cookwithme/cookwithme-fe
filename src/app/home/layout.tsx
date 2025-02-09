import { Footer } from "@/components/footer";
import Header from "@/components/header";

type Props = { children: React.ReactNode };

const Layout = async ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
