import { AvatarIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {};

const Comment = (props: Props) => {
  return (
    <>
      {[...Array(3)].map((_, index) => {
        return (
          <div key={index} className="grid grid-cols-12">
            <div className="cols-pan-3  flex justify-center p-2">
              <AvatarIcon className="w-10 h-10" />
            </div>
            <div className="col-span-9">
              <div className="bg-gray-200 border border-gray-600 rounded-sm p-8">
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="font-bold">Dev Quen</span> -
                    <span className="text-gray-700 text-sm">
                      {" "}
                      February 14, 2023 at 12:12 pm
                    </span>
                  </div>
                  <div>
                    <p className="text-sm">
                      Gosh, seeing this post brought back all sorts of fond
                      memories. Hope you are enjoying your time away. Look
                      forward to catching up again at some point.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="w-[87%] flex flex-row gap-2 p-5 border border-gray-300 rounded-sm">
        <Input className="outline-none" placeholder="Add a comment" />
        <Button type="submit">Submit</Button>
      </div>
    </>
  );
};

export default Comment;
