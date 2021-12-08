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
  border-radius: ${(p) => p.theme.border.radius};
  border: 1px solid #e2e4e7;
  /* flex: ${(p) => (p.flex ? 1 : 0)}; */
  /* height: ${(p) => p.height || "100%"}; */
  width: ${(p) => p.width || "100%"};
  box-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.1);
`;

export default Card;
