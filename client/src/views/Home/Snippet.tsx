import React, { useEffect } from "react";
import { Code, CodeBlock } from ".";
import { Card } from "../../components";
import { SnippetType } from "../../utils/types";

interface Props {
  id?: string;
  preview?: boolean;
}

//TODO: backend returns wrong type of snippet
const Snippet: React.FC<Props> = ({ id, preview }) => {
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/snippets/" + id);
      const data = await res.json();
      setData(data);
    };
    getData();
  }, [id]);

  return (
    <>
      {data && (
        <Card>
          <h1>{data.title}</h1>
          <div>{"User info: " + data.user_id}</div>
          <CodeBlock>
            <Code preview={preview}>{data.content}</Code>
            {preview && "Show more..." /* TODO: Indicate there is more code*/}
          </CodeBlock>
          <div>{data.createdAt}</div>
          <button>button</button>
          <button>button</button>
          <button>button</button>
        </Card>
      )}
    </>
  );
};

export default Snippet;
