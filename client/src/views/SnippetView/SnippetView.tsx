import React from "react";
import { useParams } from "react-router-dom";
import { Page, PageContainer, Snippet } from "../../components";

const SnippetView = () => {
  const params = useParams();
  const id = params.id;

  return (
    <PageContainer>
      <Snippet id={id} />
    </PageContainer>
  );
};

export default SnippetView;
