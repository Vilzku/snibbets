import { faEdit, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bio, Container, EditUserModal, HeaderContainer } from ".";
import {
  Avatar,
  Card,
  Header,
  Icon,
  Menu,
  MenuItem,
  PageContainer,
  Snippet,
  SubHeader,
  ToprightIcon,
} from "../../components";
import { getUserSnippets } from "../../utils/api/snippets";
import { getImage, getUserInfo } from "../../utils/api/users";
import { getCreatedAtString } from "../../utils/dateHelper";
import { SnippetType, UserType } from "../../utils/types";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.webp";

interface Props {
  userId: string | undefined;
}

const User: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<UserType>();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const params = useParams();
  const id = params.id;

  // Load user info
  useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const data = await getUserInfo(id);
          if (data) setUser(data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [id]);

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

  // Load snippets for user
  useEffect(() => {
    if (user) {
      const getSnippets = async () => {
        try {
          const data = await getUserSnippets(user.id);
          if (data) setSnippets(data);
        } catch (error) {
          console.log(error);
        }
      };
      getSnippets();
    }
  }, [user]);

  const removeSnippet = (id: string) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
  };

  const updateUser = (user: UserType) => {
    setUser(user);
    window.location.reload();
  };

  // TODO
  if (!user) return <div>Katos vaa</div>;

  return (
    <>
      <EditUserModal
        user={user}
        avatarUrl={avatarUrl}
        close={() => setShowEditModal(false)}
        show={showEditModal}
        updateUser={updateUser}
      />
      <PageContainer>
        <Container>
          <Card>
            {user.id === userId && (
              <ToprightIcon
                icon={faEllipsisH}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(true);
                }}
              />
            )}

            {/* Menu */}
            {showMenu && (
              <Menu closeMenu={() => setShowMenu(false)}>
                <MenuItem
                  onClick={() => {
                    setShowEditModal(true);
                    setShowMenu(false);
                  }}
                >
                  <Icon icon={faEdit} />
                  Edit
                </MenuItem>
                {/* <MenuItem
                onClick={() => {
                  // setShowDeleteModal(true);
                  setShowMenu(false);
                }}
              >
                <Icon icon={faTrash} />
                Delete
              </MenuItem> */}
              </Menu>
            )}

            <HeaderContainer>
              <Avatar src={avatarUrl} size="15rem" noPointer />
              <div>
                <Header double>{user.username}</Header>
                <p>{user.email}</p>
                <SubHeader>
                  {"User created " + getCreatedAtString(user.createdAt)}
                </SubHeader>
              </div>
            </HeaderContainer>
            {user.bio ? (
              <Bio>{user.bio}</Bio>
            ) : (
              <Bio grey>This user has not written a bio yet!</Bio>
            )}
          </Card>
          {snippets && snippets.length > 0 ? (
            snippets.map((snippet) => (
              <Snippet
                key={snippet.id}
                id={snippet.id}
                preview
                removeSnippet={removeSnippet}
                userId={userId}
              />
            ))
          ) : (
            <Card>This user has not posted any Snibbets yet!</Card>
          )}
        </Container>
      </PageContainer>
    </>
  );
};

export default User;
