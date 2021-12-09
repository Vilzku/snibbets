import styled from "styled-components";

interface Props {
  preview?: boolean;
}

const Code = styled.div<Props>`
  font-family: "Consolas", "Courier New", Courier, monospace;
  overflow: hidden;
  white-space: pre-wrap;

  ${(p) =>
    p.preview &&
    `
  max-height: 8em;`}
`;

export default Code;
