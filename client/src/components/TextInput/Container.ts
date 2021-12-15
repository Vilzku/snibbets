import styled from "styled-components";

interface Props {
  flex?: boolean;
}

const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: ${({ flex }) => (flex ? "1" : "")};
  margin-bottom: 1em;
`;

export default Container;
