import { darken } from "polished";
import styled from "styled-components";

const Divider = styled.div`
  border-top: 1px solid ${({ theme }) => darken(0.1, theme.colors.background)};
  margin: 0.5rem 0;
`;

export default Divider;
