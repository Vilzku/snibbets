import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer, Snippet } from "../../components";

interface Props {
  userId: string | undefined;
}

const SnippetView: React.FC<Props> = ({ userId }) => {
  const params = useParams();
  const id = params.id;

  return (
    <PageContainer>{id && <Snippet id={id} userId={userId} />}</PageContainer>
  );
};

export default SnippetView;
