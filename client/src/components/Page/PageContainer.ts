import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.black};

  @media (max-width: 1024px) {
    width: calc(100% - 4rem);
    padding: 0 2rem;
  }
`;

export default PageContainer;
