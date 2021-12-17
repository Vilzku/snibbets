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

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 600px) {
    padding: 1rem !important;
    align-items: center;
    text-align: center;
  }
`;

interface BioProps {
  grey?: boolean;
}

export const Bio = styled.p<BioProps>`
  padding: 0 3rem;
  color: ${({ grey, theme }) =>
    grey ? theme.colors.grey : theme.colors.black};

  @media (max-width: 600px) {
    padding: 1rem !important;
  }
`;
