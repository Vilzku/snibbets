import React, { useEffect } from "react";
import { List } from ".";
import { PageContainer, Snippet } from "../../components";
import { SnippetType } from "../../utils/types";

interface Props {}

const Home: React.FC<Props> = () => {
  const [data, setData] = React.useState<SnippetType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/snippets?amount=5");
      const data: SnippetType[] = await res.json();
      setData(data);
    };
    getData();
  }, []);

  return (
    <PageContainer>
      <List>
        <Snippet preview id={"665756d3-bdbd-4296-9bf2-b33567893a6b"} />
        {data.map((item) => (
          <Snippet id={item.id} key={item.id} />
        ))}
      </List>
    </PageContainer>
  );
};

export default Home;
