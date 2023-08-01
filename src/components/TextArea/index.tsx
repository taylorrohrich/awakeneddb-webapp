import { DetailedHTMLProps, TextareaHTMLAttributes, useState } from "react";
import { Markdown } from "../Markdown";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  value: string;
}
export function TextArea({
  className,
  value,
  maxLength = 4000,
  ...textAreaProps
}: Props) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const charactersLeft = maxLength - value.length;
  return (
    <div>
      <div className={twMerge("flex items-center my-2 gap-2", className)}>
        <button
          onClick={() => setTab("write")}
          className={twMerge(
            "px-4 py-1 rounded-md hover:bg-gray-200",
            tab === "write" ? "bg-gray-200" : undefined
          )}
        >
          Write
        </button>
        <button
          onClick={() => setTab("preview")}
          className={twMerge(
            "px-4 py-1 rounded-md hover:bg-gray-200",
            tab === "preview" ? "bg-gray-200" : undefined
          )}
        >
          Preview
        </button>
        <div className="ml-auto text-gray-400">
          {charactersLeft} Characters Left
        </div>
      </div>
      {tab === "write" && (
        <textarea
          maxLength={maxLength}
          {...textAreaProps}
          value={value}
          className="flex px-2 py-1 items-center justify-between gap-2 w-full cursor-default border ring-inset rounded-md shadow-sm ring-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-800 placeholder:text-gray-400"
        />
      )}
      {tab === "preview" && <Markdown markdown={value} />}
    </div>
  );
}
