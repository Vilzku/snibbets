import React from "react";
import { useParams } from "react-router-dom";
import { PageContainer, Snippet } from "../../components";

const SnippetView: React.FC = () => {
  const params = useParams();
  const id = params.id;

  return <PageContainer>{id && <Snippet id={id} />}</PageContainer>;
};

export default SnippetView;
