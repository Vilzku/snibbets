import React, { useEffect } from "react";
import { Avatar, Header, SubHeader } from "../..";
import avatar from "../../../assets/images/avatar-placeholder.png";
import { getUserInfo } from "../../../utils/api/users";
import { UserData } from "../../../utils/types";
import { Container } from ".";
import { getCreatedAtString } from "../../../utils/dateHelper";

interface Props {
  title: string;
  createdAt: string;
  userId: string;
  titleClickable?: boolean;
}

const TopInfo: React.FC<Props> = ({
  title,
  createdAt,
  userId,
  titleClickable,
}) => {
  const [user, setUser] = React.useState<UserData>({} as UserData);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo(userId);
      if (data) setUser(data);
    };
    getData();
  }, [userId]);

  return (
    <Container>
      <Avatar src={avatar} size="3rem" />
      <div>
        <Header clickable={titleClickable}>{title}</Header>
        <SubHeader>
          {/* TODO: Link to profile */}
          {user.username + " - " + getCreatedAtString(createdAt)}
        </SubHeader>
      </div>
    </Container>
  );
};

export default TopInfo;
