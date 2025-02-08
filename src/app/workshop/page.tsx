import { WorkshopList } from "@/components/workshop-list";
export const runtime = "edge";
const Page = () => {
  return (
    <div className="min-h-screen w-[80%]  mx-auto">
      <WorkshopList />
    </div>
  );
};

export default Page;
