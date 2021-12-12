import { lighten } from "polished";
import styled from "styled-components";

interface Props {
  clickable?: boolean;
}

const Header = styled.header<Props>`
  font-size: 2rem;
  font-weight: 600;

  ${({ clickable, theme }) =>
    clickable &&
    `
  &:hover {
    cursor: pointer;
    color: ${lighten(0.2, theme.colors.black)};
  }`}
`;

export default Header;
