import styled from "styled-components";

interface Props {
  size?: string;
}

const Avatar = styled.img<Props>`
  border-radius: 100%;
  height: ${({ size }) => size || "2rem"};
  width: ${({ size }) => size || "2rem"};
  cursor: pointer;
`;

export default Avatar;
