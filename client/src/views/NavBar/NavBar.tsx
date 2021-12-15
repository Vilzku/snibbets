import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar, Column, Container, Logo } from ".";
import logo from "../../assets/images/logo.png";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.png";
import { Avatar, Icon, Menu, MenuDivider, MenuItem } from "../../components";
import { faCog, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
  user: { username: string; id: string } | null;
  handleLogout: () => void;
}

const NavBar: React.FC<Props> = ({ user, handleLogout }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState<string>();
  const navigate = useNavigate();

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
          <Logo src={logo} alt="logo" onClick={() => navigate("/")} />
          <Link to="/">Something</Link>
          <Link to="/">Hmm</Link>
          <Link to="/">Still something</Link>
        </Column>
        {user && (
          <Column>
            <p>{user.username}</p>
            <Avatar
              src={avatarUrl || avatarPlaceholder}
              alt="avatar"
              size="2rem"
              onClick={toggleMenu}
            />
            {showMenu && (
              <Menu closeMenu={() => setShowMenu(false)}>
                <MenuItem>
                  <Icon icon={faUser} />
                  Profile
                </MenuItem>
                <MenuItem>
                  <Icon icon={faCog} />
                  <div style={{ textDecoration: "line-through" }}>Settings</div>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    setShowMenu(false);
                    handleLogout();
                  }}
                >
                  <Icon icon={faSignOutAlt} />
                  Sign out
                </MenuItem>
              </Menu>
            )}
          </Column>
        )}
      </Container>
    </Bar>
  );
};

export default NavBar;
