import { CookMessage } from "@/constants/types";
import LoadingDots from "./loading-dots";
import { parseMarkdownToHTML } from "@/lib/utils";

const Message = ({ role, content }: CookMessage) => {
  return (
    <div
      className={`mb-4 flex ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex lg:max-w-[17rem]  max-w-[15rem] items-end gap-2 overflow-x-auto rounded-lg ${
          role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`rounded-lg p-3 shadow-md w-full ${
            role === "user" ? "bg-green-700 text-white" : "bg-gray-100"
          }`}
        >
          {role === "ai" && content === "l" ? (
            <LoadingDots />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: parseMarkdownToHTML(content),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Message;
