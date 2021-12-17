import styled from "styled-components";

const Page = styled.div`
  background: ${(p) => p.theme.colors.background};
  min-height: calc(100vh - 3.5rem - 5rem);
  font-family: "Lato", sans-serif;
  color: ${({ theme }) => theme.colors.black};
  padding-top: 3.5rem;
  padding-bottom: 5rem;
  z-index: 0;

  @media (max-width: 1024px) {
    width: 100vw;
  }
`;

export default Page;
