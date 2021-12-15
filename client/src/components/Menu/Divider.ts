import styled from "styled-components";

interface Props {}

const Divider = styled.div<Props>`
  margin: 0.5em 0em;
  background: ${({ theme }) => theme.colors.lightGrey};
  height: 1px;
`;

export default Divider;
