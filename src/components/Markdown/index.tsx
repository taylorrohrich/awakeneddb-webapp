import ReactMarkdown from "react-markdown";
import { twMerge } from "tailwind-merge";

interface Props {
  markdown: string;
  className?: string;
}
export function Markdown({ markdown, className }: Props) {
  return (
    <ReactMarkdown
      className={twMerge("prose max-w-none", className)}
      disallowedElements={["a"]}
    >
      {markdown}
    </ReactMarkdown>
  );
}
