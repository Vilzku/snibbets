import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
  align-items: center;
  word-break: break-all;
  padding-right: 3rem;
`;

export const ProfileLink = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
