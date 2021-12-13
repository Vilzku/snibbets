import React from "react";
import { Container, Divider, Item } from ".";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../components";

interface Props {
  handleLogout: () => void;
}

const ProfileMenu: React.FC<Props> = ({ handleLogout }) => {
  return (
    <Container>
      <Item>
        <Icon icon={faUser} />
        Profile
      </Item>
      <Item>
        <Icon icon={faCog} />
        Asetukset
      </Item>
      <Divider />
      <Item onClick={handleLogout}>
        <Icon icon={faSignOutAlt} />
        Kirjaudu ulos
      </Item>
    </Container>
  );
};

export default ProfileMenu;
