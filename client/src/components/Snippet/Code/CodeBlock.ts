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

  ${({ hover, theme }) =>
    hover &&
    `
  &:hover {
    cursor: pointer;
    background: ${lighten(0.03, theme.colors.lightGrey)};
  }`}
`;

export default CodeBlock;
