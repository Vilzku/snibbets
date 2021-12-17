import styled from "styled-components";

interface Props {
  width?: string;
  active?: boolean;
}

const Button = styled.button<Props>`
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  background: none;
  border: none;
  width: ${({ width }) => width || "auto"};
  flex: ${({ width }) => (width ? 0 : 1)};
  border-radius: calc(${({ theme }) => theme.border.radius} / 2);
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.grey};
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.lightGrey};
    color: ${({ theme }) => theme.colors.black};
  }

  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0.2rem;
  }
`;

export default Button;
