import styled from "styled-components";

const Bar = styled.div`
  height: 3.5rem;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.white};
  font-family: "Lato", sans-serif;
`;

export default Bar;
