import styled from "styled-components";

interface Props {
  size?: string;
  noPointer?: boolean;
  border?: boolean;
  center?: boolean;
}

//TODO: Fix blurry image
const Avatar = styled.img<Props>`
  margin: ${({ center }) => (center ? "auto" : "0")};
  aspect-ratio: 1;
  border: ${({ border, theme }) =>
    border ? "0.2rem solid " + theme.colors.primary : "none"};
  border-radius: 100%;
  height: ${({ size }) => size || "2rem"};
  width: ${({ size }) => size || "2rem"};
  object-fit: cover;
  cursor: ${({ noPointer }) => (noPointer ? "" : "pointer")};
`;

export default Avatar;
