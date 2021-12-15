import React, { useEffect } from "react";
import { Avatar, Header, SubHeader } from "../..";
import avatarPlaceholder from "../../../assets/images/avatar-placeholder.png";
import { getUserInfo } from "../../../utils/api/users";
import { UserData } from "../../../utils/types";
import { Container } from ".";
import { getCreatedAtString } from "../../../utils/dateHelper";

interface Props {
  title: string;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
  titleClickable?: boolean;
}

const TopInfo: React.FC<Props> = ({
  title,
  createdAt,
  updatedAt,
  userId,
  titleClickable,
}) => {
  const [user, setUser] = React.useState<UserData>({} as UserData);
  const [avatarUrl, setAvatarUrl] = React.useState<string>();

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo(userId);
      if (data) setUser(data);
    };
    getData();
  }, [userId]);

  useEffect(() => {
    //TODO: image does not always load
    user && setAvatarUrl(`/api/users/image/${user.id}`);
  }, [user]);

  return (
    <Container>
      <Avatar src={avatarUrl || avatarPlaceholder} size="3rem" />
      <div>
        <Header clickable={titleClickable}>{title}</Header>
        <SubHeader>
          {/* TODO: Link to profile */}
          {user.username +
            (createdAt ? " - " + getCreatedAtString(createdAt as string) : "") +
            (updatedAt
              ? " - updated " + getCreatedAtString(updatedAt as string)
              : "")}
        </SubHeader>
      </div>
    </Container>
  );
};

export default TopInfo;
