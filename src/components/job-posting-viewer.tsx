import { type FC } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

export const JobPostingViewer: FC<Props> = ({ content }) => {
  return (
    <article className="prose lg:prose-xl dark:prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};
