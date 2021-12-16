import { Link } from "react-router-dom";
import styled from "styled-components";

export const Bar = styled.div`
  height: 3.5rem;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.black};
  font-family: "Lato", sans-serif;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
`;

interface ColumnProps {
  flex?: boolean;
}

export const Column = styled.div<ColumnProps>`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  flex: ${({ flex }) => (flex ? "1" : "0")};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  height: 100%;
  margin: auto;
  max-width: 1200px;
  width: 80%;
`;

export const Logo = styled.img`
  height: 2rem;
  cursor: pointer;
`;

export const ProfileName = styled(Link)`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  margin-right: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;
