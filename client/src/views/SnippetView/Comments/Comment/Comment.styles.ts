import styled from "styled-components";
import { Icon } from "../../../../components";

export const UpperContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const MenuIcon = styled(Icon)`
  padding: 0.75rem 0.8rem;
  border-radius: 100%;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.grey};
  opacity: 0;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 0.5em 0.75em;
  white-space: pre-wrap;
`;

export const MenuIconContainer = styled.div`
  position: relative;
  align-self: center;
`;

export const Container = styled.div`
  flex: 1;
`;
