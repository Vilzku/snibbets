import React, { useEffect } from "react";
import { List } from ".";
import { PageContainer, Snippet } from "../../components";
import { getAllSnippets } from "../../utils/api/snippets";
import { SnippetType } from "../../utils/types";

interface Props {}

const Home: React.FC<Props> = () => {
  const [data, setData] = React.useState<SnippetType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllSnippets({
          amount: 5,
          page: undefined,
          sortBy: undefined,
          order: undefined,
        });
        if (data) setData(data);
      } catch (error) {
        console.log(error);
        // TODO: Error handling, maybe loading indicator
      }
    };
    getData();
  }, []);

  return (
    <PageContainer>
      <List>
        <Snippet preview id={"665756d3-bdbd-4296-9bf2-b33567893a6b"} />
        {data && data.map((item) => <Snippet id={item.id} key={item.id} />)}
      </List>
    </PageContainer>
  );
};

export default Home;
