import { lighten } from "polished";
import styled from "styled-components";

interface Props {
  clickable?: boolean;
  center?: boolean;
  double?: boolean;
}

const Header = styled.header<Props>`
  font-size: ${({ double }) => (double ? "4rem" : "2rem")};
  font-weight: 600;
  text-align: ${({ center }) => (center ? "center" : "left")};

  ${({ clickable, theme }) =>
    clickable &&
    `
  &:hover {
    cursor: pointer;
    color: ${lighten(0.2, theme.colors.black)};
  }`}
`;

export default Header;
