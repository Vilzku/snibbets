import React from "react";
import { useParams } from "react-router-dom";
import { Container } from ".";
import { PageContainer, Snippet } from "../../components";

interface Props {
  userId: string | undefined;
}

const SnippetView: React.FC<Props> = ({ userId }) => {
  const params = useParams();
  const id = params.id;

  return (
    <PageContainer>
      <Container>{id && <Snippet id={id} userId={userId} />}</Container>
    </PageContainer>
  );
};

export default SnippetView;
