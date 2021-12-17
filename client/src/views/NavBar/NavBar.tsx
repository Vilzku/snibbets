import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Bar, Column, Container, Logo, ProfileName } from ".";
import logo from "../../assets/images/logo.png";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.webp";
import {
  Avatar,
  Button,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  SubmitIcon,
  TextInput,
} from "../../components";
import {
  faCog,
  faSearch,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getImage } from "../../utils/api/users";

interface Props {
  user: { username: string; id: string } | null;
  handleLogout: () => void;
}

const NavBar: React.FC<Props> = ({ user, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(search);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  useEffect(() => {
    setSearchValue(search);
  }, [pathname, search]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (user?.id) {
      const getAvatar = async () => {
        try {
          const url = await getImage(user.id);
          if (url) setAvatarUrl(url);
        } catch (error) {
          setAvatarUrl(avatarPlaceholder);
        }
      };
      getAvatar();
    }
  }, [user]);

  const handleSearch = () => {
    navigate("/home?search=" + searchValue);
  };

  return (
    <Bar>
      <Container>
        <Column>
          <Logo src={logo} alt="logo" onClick={() => navigate("/home")} />
        </Column>
        <Column flex hideOnSmall>
          <TextInput
            type="search"
            placeholder="Search"
            noMargin
            flex
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <SubmitIcon icon={faSearch} onClick={handleSearch} />
        </Column>
        {user ? (
          <Column>
            {user.username.length <= 10 && (
              <ProfileName to={"/user/" + user.id}>{user.username}</ProfileName>
            )}
            <Avatar
              src={avatarUrl}
              alt="avatar"
              size="2rem"
              onClick={toggleMenu}
            />
            {showMenu && (
              <Menu closeMenu={() => setShowMenu(false)}>
                <MenuItem onClick={() => navigate("/user/" + user.id)}>
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
        ) : (
          pathname !== "/" && (
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </Button>
          )
        )}
      </Container>
    </Bar>
  );
};

export default NavBar;
