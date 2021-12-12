import styled from "styled-components";

interface Props {
  width?: string;
  height?: string;
  gap?: string;
}

const Card = styled.div<Props>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || ""};
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid #e2e4e7;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  box-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.1);
`;

export default Card;
