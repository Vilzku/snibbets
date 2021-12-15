import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Icon } from ".";
import styled from "styled-components";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

const AbsoluteIcon = styled(Icon)`
  position: absolute;
  top: 0.5rem;
  right: 0.7rem;
  color: ${({ theme }) => theme.colors.grey};
  padding: 0.75rem 0.8rem;
  border-radius: 100%;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

interface Props {
  icon: IconDefinition;
  onClick: (e: React.MouseEvent) => void;
  size?: SizeProp;
}

const ToprightIcon: React.FC<Props> = ({ icon, onClick, size }) => {
  return <AbsoluteIcon icon={icon} size={size} onClick={onClick} />;
};

export default ToprightIcon;
