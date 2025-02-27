import { type FC } from "react";
import Markdown from "react-markdown";

interface Props {
  text: string;
  wordLimit?: number;
}

export const TruncatedMdText: FC<Props> = ({ text, wordLimit = 50 }) => {
  const words = text.replaceAll("\n", "").split(" ");
  const truncated = words.length > wordLimit;
  const displayText = truncated
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;

  return <Markdown>{displayText}</Markdown>;
};
