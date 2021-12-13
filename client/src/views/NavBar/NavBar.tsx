import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar, Column, Container, Logo, ProfileMenu } from ".";
import logo from "../../assets/images/logo.png";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.png";
import { Avatar } from "../../components";

interface Props {
  user: { username: string; id: string } | null;
  handleLogout: () => void;
}

const NavBar: React.FC<Props> = ({ user, handleLogout }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState<string>();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    //TODO: image does not always load
    user && setAvatarUrl(`/api/users/image/${user.id}`);
  }, [user]);

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
              src={avatarUrl ? avatarUrl : avatarPlaceholder}
              alt="avatar"
              size="2rem"
              onClick={toggleMenu}
            />
            {showMenu && <ProfileMenu handleLogout={handleLogout} />}
          </Column>
        )}
      </Container>
    </Bar>
  );
};

export default NavBar;
