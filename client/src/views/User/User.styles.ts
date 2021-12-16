import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem 0;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  padding: 1rem 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

interface BioProps {
  grey?: boolean;
}

export const Bio = styled.p<BioProps>`
  padding: 0 3rem;
  color: ${({ grey, theme }) =>
    grey ? theme.colors.grey : theme.colors.black};
`;
