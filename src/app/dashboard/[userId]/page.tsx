import { Dashboard } from "@/components/dashboard";
import { Header } from "@/components/headerAdmin";
export const runtime = "edge";
type Props = {};
const Page = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <Dashboard />
      </main>
    </div>
  );
};
export default Page;
