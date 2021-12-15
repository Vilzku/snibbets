import React, { useEffect } from "react";
import { List } from ".";
import { Divider, NewSnippet, PageContainer, Snippet } from "../../components";
import { getAllSnippets } from "../../utils/api/snippets";
import { SnippetType } from "../../utils/types";

interface Props {
  userId: string | undefined;
}

const Home: React.FC<Props> = ({ userId }) => {
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
        // TODO: !!! Error handling, maybe loading indicator
      }
    };
    getData();
  }, []);

  const addNewSnippet = (newSnippet: SnippetType) => {
    setData([newSnippet, ...data]);
  };

  const removeSnippet = (id: string) => {
    setData(data.filter((snippet) => snippet.id !== id));
  };

  return (
    <PageContainer>
      <List>
        <NewSnippet addNewSnippet={addNewSnippet} userId={userId} />
        <Divider />
        {data &&
          data.map((item) => (
            <Snippet
              preview
              id={item.id}
              key={item.id}
              userId={userId}
              removeSnippet={removeSnippet}
            />
          ))}
      </List>
    </PageContainer>
  );
};

export default Home;
