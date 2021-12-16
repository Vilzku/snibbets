import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.black};
`;

export default PageContainer;
