import React, { useEffect } from "react";
import { Code, CodeBlock, TopInfo } from ".";
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

  useEffect(() => {
    const getData = async () => {
      const data = await getSnippet(id);
      if (data) setSnippet(data);
    };
    getData();
  }, [id]);

  return (
    <>
      {snippet && (
        <Card>
          <TopInfo
            title="asdasd"
            createdAt={snippet.createdAt}
            userId={snippet.userId}
          />
          <CodeBlock>
            <Code preview={preview}>{snippet.content}</Code>
            {preview && "Show more..." /* TODO: Indicate there is more code*/}
          </CodeBlock>
          <BottomBar snippetId={snippet.id} userId={userId} />
        </Card>
      )}
    </>
  );
};

export default Snippet;
