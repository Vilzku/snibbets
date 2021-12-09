import React from "react";
import { Container, Divider, Item } from ".";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../components";

const ProfileMenu: React.FC = () => {
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
      <Item>
        <Icon icon={faSignOutAlt} />
        Kirjaudu ulos
      </Item>
    </Container>
  );
};

export default ProfileMenu;
