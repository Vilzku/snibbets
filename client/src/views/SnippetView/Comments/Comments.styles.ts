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

export const SendIcon = styled(Icon)`
  padding: 0.75rem 0.8rem;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => darken(0.08, theme.colors.primary)};
  }
`;
