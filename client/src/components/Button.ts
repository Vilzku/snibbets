import styled from "styled-components";
import { darken } from "polished";

const Button = styled.button`
  height: 2.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem 0.75rem;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 20rem;

  ${({ theme, disabled }) =>
    !disabled &&
    `
  &:hover {
    background: ${() => darken(0.1, theme.colors.primary)};
    cursor: pointer;
  }`}
`;

export default Button;
