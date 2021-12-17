import {
  faBook,
  faPeopleArrows,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Container, TextGrid } from ".";
import { Header, Icon, SubHeader } from "../../../components";

interface Props {}

const Info: React.FC<Props> = () => {
  return (
    <Container>
      <Header>Join the Snibbets community</Header>
      <br />
      <TextGrid>
        <Icon icon={faPeopleArrows} size="2x" />
        <p>Share your coding skills with others</p>
        <Icon icon={faBook} size="2x" />
        <p>Learn new things</p>
        <Icon icon={faTrophy} size="2x" />
        <p>Earn reputation among the best coders in the world</p>
      </TextGrid>
      <br />
      <SubHeader style={{ fontSize: "0.875em" }}>
        Creating an account is totally free!
      </SubHeader>
    </Container>
  );
};

export default Info;
