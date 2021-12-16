import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em 0.75em;
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid #ccc;
  outline: none;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export default Input;
