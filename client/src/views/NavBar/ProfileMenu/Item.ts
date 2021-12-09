import styled from "styled-components";

interface Props {}

const Item = styled.div<Props>`
  padding: 0.5em 1em;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.75em;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    cursor: pointer;
  }
`;

export default Item;
