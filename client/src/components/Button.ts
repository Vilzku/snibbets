import styled from "styled-components";
import { darken } from "polished";

const Button = styled.button`
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};

  ${({ theme, disabled }) =>
    !disabled &&
    `
  &:hover {
    background: ${darken(0.08, theme.colors.primary)};
    cursor: pointer;
  }`}
`;

export default Button;
