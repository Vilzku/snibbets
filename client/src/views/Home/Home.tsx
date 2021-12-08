import React, { useEffect } from "react";
import { Container, List, Snippet } from ".";
import { Page } from "../../components";
import { SnippetType } from "../../utils/types";

interface Props {}

const Home: React.FC<Props> = () => {
  const [data, setData] = React.useState<SnippetType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/snippets?amount=2");
      const data: SnippetType[] = await res.json();
      setData(data);
    };
    getData();
  }, []);

  return (
    <Page>
      <Container>
        <List>
          {data.map((item) => (
            <Snippet id={item.id} key={item.id} />
          ))}

          <Snippet
            preview
            id={"665756d3-bdbd-4296-9bf2-b33567893a6b"}
            key={"665756d3-bdbd-4296-9bf2-b33567893a6b"}
          />
        </List>
      </Container>
    </Page>
  );
};

export default Home;
