import { darken } from "polished";
import styled from "styled-components";

interface Props {
  show: boolean;
}

const ShowMore = styled.div<Props>`
  display: ${({ show }) => (show ? "block" : "none")};
  text-align: center;
  color: ${({ theme }) => darken(0.2, theme.colors.lightGrey)};

  &:hover {
    color: ${({ theme }) => darken(0.4, theme.colors.lightGrey)};
  }
`;

export default ShowMore;
