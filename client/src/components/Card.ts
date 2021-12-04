import styled from "styled-components";

interface Props {
  width?: string;
  height?: string;
  flex?: boolean;
}

const Card = styled.div<Props>`
  position: relative;
  padding: 1rem;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 1rem;
  flex: ${(p) => (p.flex ? 1 : 0)};
  height: ${(p) => p.height || "100%"};
  width: ${(p) => p.width || "100%"};
`;

export default Card;
