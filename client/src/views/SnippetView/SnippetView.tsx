import React from "react";
import { useParams } from "react-router-dom";
import { Page, PageContainer, Snippet } from "../../components";

const SnippetView = () => {
  const params = useParams();
  const id = params.id;

  return (
    <Page>
      <PageContainer>
        <Snippet id={id} />
      </PageContainer>
    </Page>
  );
};

export default SnippetView;
