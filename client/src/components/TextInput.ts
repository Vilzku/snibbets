import { darken } from "polished";
import styled from "styled-components";

const TextInput = styled.input`
  height: 1.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border-radius: 20rem;
  border: none;
  outline: none;
  background: ${(p) => darken(0.05, p.theme.colors.white)};
`;

export default TextInput;
