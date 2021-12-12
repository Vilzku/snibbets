import styled from "styled-components";

interface Props {
  error?: boolean;
}

const SubText = styled.p<Props>`
  margin: 0;
  margin-top: 0.5em;
  font-size: 0.75em;
  padding-left: 0.2em;
  color: ${({ error, theme }) =>
    !error ? theme.colors.grey : theme.colors.red};
  white-space: pre-wrap;
`;

export default SubText;
