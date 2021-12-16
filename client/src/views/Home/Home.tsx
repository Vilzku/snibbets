import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { List } from ".";
import {
  Button,
  Divider,
  NewSnippet,
  PageContainer,
  Snippet,
} from "../../components";
import { getAllSnippets } from "../../utils/api/snippets";
import { SnippetType } from "../../utils/types";

interface Props {
  userId: string | undefined;
}

const PAGE_AMOUNT = 5;

const Home: React.FC<Props> = ({ userId }) => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [showMoreButton, setShowMoreButton] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllSnippets({
          amount: PAGE_AMOUNT,
          page: 1,
          search: search.length > 0 ? search : undefined,
        });
        if (data) {
          setSnippets(data);
          if (data.length < PAGE_AMOUNT) setShowMoreButton(false);
        }
      } catch (error) {
        console.log(error);
        // TODO: !!! Error handling, maybe loading indicator
      }
    };
    getData();
  }, [search]);

  const loadMore = async () => {
    const page = snippets.length / PAGE_AMOUNT + 1;
    try {
      const data = await getAllSnippets({
        amount: PAGE_AMOUNT,
        page: page,
      });
      if (data) {
        setSnippets((snippets) => [...snippets, ...data]);
        if (data.length < PAGE_AMOUNT) setShowMoreButton(false);
      }
    } catch (error) {
      console.log(error);
      // TODO: !!! Error handling, maybe loading indicator
    }
  };

  const addNewSnippet = (newSnippet: SnippetType) => {
    setSnippets([newSnippet, ...snippets]);
  };

  const removeSnippet = (id: string) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
  };

  return (
    <PageContainer>
      <List>
        {userId && (
          <>
            <NewSnippet addNewSnippet={addNewSnippet} userId={userId} />
            <Divider />
          </>
        )}
        {snippets &&
          snippets.map((item) => (
            <Snippet
              preview
              id={item.id}
              key={item.id}
              userId={userId}
              removeSnippet={removeSnippet}
            />
          ))}
        {showMoreButton && <Button onClick={loadMore}>Show more</Button>}
      </List>
    </PageContainer>
  );
};

export default Home;
