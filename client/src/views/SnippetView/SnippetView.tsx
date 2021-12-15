import React from "react";
import { useParams } from "react-router-dom";
import { Comments, Container } from ".";
import { PageContainer, Snippet } from "../../components";

interface Props {
  userId: string | undefined;
}

const SnippetView: React.FC<Props> = ({ userId }) => {
  const params = useParams();
  const id = params.id;

  if (!id) return null;

  return (
    <PageContainer>
      <Container>
        <Snippet id={id} userId={userId} />
        <Comments snippetId={id} userId={userId} />
      </Container>
    </PageContainer>
  );
};

export default SnippetView;
