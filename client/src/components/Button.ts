import styled from "styled-components";
import { darken } from "polished";

const Button = styled.button`
  height: 2.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem 0.75rem;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 20rem;

  &:hover {
    background: ${(props) => darken(0.1, props.theme.colors.primary)};
    cursor: pointer;
  }
`;

export default Button;
