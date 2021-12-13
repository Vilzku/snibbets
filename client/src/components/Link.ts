import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  center?: boolean;
}

const Link = styled(RouterLink)<Props>`
  color: ${({ theme }) => theme.colors.primary};
  text-align: ${({ center }) => center && "center"};
`;

export default Link;
