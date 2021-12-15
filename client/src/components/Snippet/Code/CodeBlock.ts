import { lighten } from "polished";
import styled from "styled-components";

interface Props {
  hover?: boolean;
}

const CodeBlock = styled.div<Props>`
  box-shadow: inset 0 0 0.5em rgba(0, 0, 0, 0.1);
  padding: 1em;
  background: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 0.5rem;
  white-space: pre-wrap;
  flex: 1;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => lighten(0.01, theme.colors.lightGrey)};
  }
`;

export default CodeBlock;
