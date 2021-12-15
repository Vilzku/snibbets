import styled from "styled-components";

interface Props {}

const Container = styled.div<Props>`
  position: absolute;
  background: ${({ theme }) => theme.colors.white};
  right: -0.5rem;
  top: 3em;
  padding: 0.5em 0rem;
  width: 12em;
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  z-index: 20;
  cursor: default;
`;

export default Container;
