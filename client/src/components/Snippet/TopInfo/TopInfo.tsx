import React, { useEffect, useState } from "react";
import { Avatar, Header, SubHeader } from "../..";
import avatarPlaceholder from "../../../assets/images/avatar-placeholder.webp";
import { getImage, getUserInfo } from "../../../utils/api/users";
import { UserType } from "../../../utils/types";
import { Container, ProfileLink } from ".";
import { getCreatedAtString } from "../../../utils/dateHelper";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
  titleClickable?: boolean;
  onClick?: () => void;
}

const TopInfo: React.FC<Props> = ({
  title,
  createdAt,
  updatedAt,
  userId,
  titleClickable,
  onClick,
}) => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo(userId);
      if (data) setUser(data);
    };
    getData();
  }, [userId]);

  useEffect(() => {
    if (user.id) {
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

  return (
    <Container>
      <Avatar
        src={avatarUrl}
        size="3rem"
        onClick={() => navigate("/user/" + user.id)}
      />
      <div>
        <Header
          onClick={onClick ? onClick : () => null}
          clickable={titleClickable}
        >
          {title}
        </Header>
        <SubHeader>
          <ProfileLink onClick={() => navigate("/user/" + user.id)}>
            {user.username}
          </ProfileLink>
          {(createdAt ? " - " + getCreatedAtString(createdAt as string) : "") +
            (updatedAt
              ? " - updated " + getCreatedAtString(updatedAt as string)
              : "")}
        </SubHeader>
      </div>
    </Container>
  );
};

export default TopInfo;
