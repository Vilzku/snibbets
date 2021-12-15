import styled from "styled-components";

interface Props {}

const SubHeader = styled.p<Props>`
  margin: 0;
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  gap: 0.25em;
`;

export default SubHeader;
