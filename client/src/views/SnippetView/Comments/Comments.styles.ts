import { darken } from "polished";
import styled from "styled-components";
import { Card, Icon } from "../../../components";

export const CommentCard = styled(Card)`
  margin-top: -1rem;
  padding-top: calc(1rem + 1.5rem);
  z-index: 0;
  gap: 0.5rem;
`;

export const NewCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;
