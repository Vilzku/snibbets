import styled from "styled-components";

interface Props {
  flex?: boolean;
  noMargin?: boolean;
}

const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: ${({ flex }) => (flex ? "1" : "")};
  margin-bottom: ${({ noMargin }) => (noMargin ? "0" : "1rem")};
`;

export default Container;
