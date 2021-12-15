import React from "react";
import { Container } from ".";

import useOutsideClick from "../../utils/hooks/useOutsideClick";

interface Props {
  closeMenu: () => void;
}

const ProfileMenu: React.FC<Props> = ({ closeMenu, children }) => {
  const ref = React.useRef(null);
  useOutsideClick(ref, closeMenu);

  return (
    <Container ref={ref} onClick={(e) => e.stopPropagation()}>
      {children}
    </Container>
  );
};

export default ProfileMenu;
