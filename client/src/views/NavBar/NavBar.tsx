import React from "react";
import { Link } from "react-router-dom";
import { Bar, Column, Container, Logo, ProfileMenu } from ".";
import logo from "../../assets/images/logo-placeholder.png";
import avatar from "../../assets/images/avatar-placeholder.png";
import { Avatar } from "../../components";
import { UserData } from "../../utils/types";

interface Props {
  user: UserData | null;
}

const NavBar: React.FC<Props> = ({ user }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Bar>
      <Container>
        <Column>
          <Logo src={logo} alt="logo" />
          <Link to="/">Something</Link>
          <Link to="/">Hmm</Link>
          <Link to="/">Still something</Link>
        </Column>
        {user && (
          <Column>
            <p>{user.username}</p>
            <Avatar
              src={avatar}
              alt="avatar"
              size="2rem"
              onClick={toggleMenu}
            />
            {showMenu && <ProfileMenu />}
          </Column>
        )}
      </Container>
    </Bar>
  );
};

export default NavBar;
