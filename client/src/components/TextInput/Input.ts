import styled from "styled-components";

const Input = styled.input`
  height: 1.5em;
  padding: 0.5em 0.75em;
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid #ccc;
  outline: none;
  /* background: ${({ theme }) => theme.colors.lightGrey}; */

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export default Input;
