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
  word-break: break-all;

  ${({ clickable, theme }) =>
    clickable &&
    `
  &:hover {
    cursor: pointer;
    color: ${lighten(0.2, theme.colors.black)};
  }`}

  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export default Header;
