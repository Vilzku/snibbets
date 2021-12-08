import { darken } from "polished";
import styled from "styled-components";

interface Props {}

const CodeBlock = styled.div<Props>`
  box-shadow: inset 0 0 0.5em rgba(0, 0, 0, 0.1);
  padding: 1em;
  background: ${(p) => darken(0.05, p.theme.colors.white)};
  border-radius: 0.5rem;
  white-space: pre-wrap;
`;

export default CodeBlock;
