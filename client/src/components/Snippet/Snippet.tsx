import React, { useEffect } from "react";
import { Code, CodeBlock, TopInfo } from ".";
import { Card } from "..";
import { getSnippet } from "../../utils/api/snippets";
import { SnippetType } from "../../utils/types";

interface Props {
  id: string;
  preview?: boolean;
}

const Snippet: React.FC<Props> = ({ id, preview }) => {
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
        <Card gap="0.5rem">
          <TopInfo
            title="asdasd"
            createdAt={snippet.createdAt}
            userId={snippet.userId}
          />
          <CodeBlock>
            <Code preview={preview}>{snippet.content}</Code>
            {preview && "Show more..." /* TODO: Indicate there is more code*/}
          </CodeBlock>
          <div>
            <button>button</button>
            <button>button</button>
            <button>button</button>
          </div>
        </Card>
      )}
    </>
  );
};

export default Snippet;
