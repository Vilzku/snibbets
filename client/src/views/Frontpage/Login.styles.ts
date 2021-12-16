import { Link } from "react-router-dom";
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "left right"
    "bottom bottom";
  grid-template-columns: auto 22rem;
  padding: 1rem;
  gap: 1rem;
  padding-top: 5rem;
`;

export const SnippetContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 4rem;
  gap: 1rem;
  grid-column: 1 / span 2;
`;

export const Logo = styled.img`
  max-width: 25rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  white-space: pre-wrap;
`;
