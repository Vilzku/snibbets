import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, InfoContainer, LoginCard, Logo, SnippetContainer } from ".";
import { Button, Header, PageContainer, Snippet } from "../../components";
import { getAllSnippets } from "../../utils/api/snippets";
import { SnippetType } from "../../utils/types";
import logo from "../../assets/images/logo.png";

interface Props {
  handleLogin: (user: { username: string; id: string }) => void;
}

const Frontpage: React.FC<Props> = ({ handleLogin }) => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllSnippets({
          amount: 3,
          page: 1,
        });
        if (data) {
          setSnippets(data);
        }
      } catch (error) {
        console.log(error);
        // TODO: !!! Error handling, maybe loading indicator
      }
    };
    getData();
  }, []);

  return (
    <PageContainer>
      <Grid>
        <InfoContainer>
          <Logo src={logo} />
          <p>
            {"A place where you can learn coding"}
            <br />
            {"\t- together."}
          </p>
        </InfoContainer>
        <LoginCard handleLogin={handleLogin} />
        <SnippetContainer>
          <Header>Newest snibbets</Header>
          {snippets &&
            typeof snippets === typeof [] &&
            snippets.map((snippet) => (
              <Snippet key={snippet.id} id={snippet.id} preview />
            ))}
          {snippets.length > 0 || typeof snippets !== typeof [] ? (
            <Button onClick={() => navigate("/home")}>
              Show more Snibbets
            </Button>
          ) : (
            <p>
              It seems like the server is currently unavailable. Please try
              again later.
            </p>
          )}
        </SnippetContainer>
      </Grid>
    </PageContainer>
  );
};

export default Frontpage;
