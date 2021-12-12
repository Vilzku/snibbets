import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code, CodeBlock, ShowMore, TopInfo } from ".";
import { Card } from "..";
import { getSnippet } from "../../utils/api/snippets";
import { SnippetType } from "../../utils/types";
import BottomBar from "./BottomBar";

interface Props {
  id: string;
  userId: string | undefined;
  preview?: boolean;
}

const Snippet: React.FC<Props> = ({ id, preview, userId }) => {
  const [snippet, setSnippet] = React.useState<SnippetType | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getSnippet(id);
      if (data) setSnippet(data);
    };
    getData();
  }, [id]);

  const handleClick = () => {
    navigate("/" + id);
  };

  const numberOfLines = snippet?.content.split("\n").length || 0;
  let content = "";
  if (numberOfLines > 8) {
    snippet?.content.split("\n").forEach((line, i) => {
      if (i < 8) {
        console.log(line, i);
        content += line + "\n";
      }
    });
    content += "...";
  } else {
    content = snippet?.content || "";
  }

  return (
    <>
      {snippet && (
        <Card clickable={preview} onClick={preview ? handleClick : () => null}>
          <TopInfo
            title="asdasd"
            createdAt={snippet.createdAt}
            userId={snippet.userId}
            titleClickable={preview}
          />
          <CodeBlock>
            <Code>{preview ? content : snippet.content}</Code>
            <ShowMore show={preview ? numberOfLines > 8 : false}>
              Show more
            </ShowMore>
          </CodeBlock>
          <BottomBar snippetId={snippet.id} userId={userId} />
        </Card>
      )}
    </>
  );
};

export default Snippet;
