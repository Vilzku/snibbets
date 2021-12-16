import { darken } from "polished";
import styled from "styled-components";
import { Icon } from ".";

interface Props {}

const SubmitIcon = styled(Icon)<Props>`
  padding: 0.5rem 0.5rem;
  min-height: 1rem;
  min-width: 1rem;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => darken(0.08, theme.colors.primary)};
  }
`;

export default SubmitIcon;
