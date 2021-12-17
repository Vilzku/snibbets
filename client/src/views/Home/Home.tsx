import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { List } from ".";
import {
  Button,
  Divider,
  NewSnippet,
  PageContainer,
  Snippet,
  SubHeader,
} from "../../components";
import { getAllSnippets } from "../../utils/api/snippets";
import { SnippetType } from "../../utils/types";

interface Props {
  userId: string | undefined;
}

const PAGE_AMOUNT = 10;

const Home: React.FC<Props> = ({ userId }) => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [showMoreButton, setShowMoreButton] = useState(true);

  const [searchParams] = useSearchParams();
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
        {snippets.length === 0 && (
          <SubHeader>
            It is quite empty here! Try different search parameters or try again
            later if the service is down.
          </SubHeader>
        )}
        {showMoreButton && <Button onClick={loadMore}>Show more</Button>}
      </List>
    </PageContainer>
  );
};

export default Home;
