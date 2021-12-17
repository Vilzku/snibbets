import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Avatar, Modal } from ".";
import { Button, Card, Header, TextInput, ToprightIcon } from ".";
import { postSnippet } from "../utils/api/snippets";
import { getImage } from "../utils/api/users";
import { SnippetType } from "../utils/types";
import { CodeBlock } from "./Snippet";
import avatarPlaceholder from "../assets/images/avatar-placeholder.webp";

interface Props {
  addNewSnippet: (newSnippet: SnippetType) => void;
  userId: string | undefined;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const NewSnippet: React.FC<Props> = ({ addNewSnippet, userId }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState<string>();

  const handleSubmit = async () => {
    try {
      const snippet = await postSnippet(title, content);
      if (snippet) {
        addNewSnippet(snippet);
        setShowModal(false);
        setTitle("");
        setContent("");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      const getAvatar = async () => {
        try {
          const url = await getImage(userId);
          if (url) setAvatarUrl(url);
        } catch (error) {
          setAvatarUrl(avatarPlaceholder);
        }
      };
      getAvatar();
    }
  }, [userId]);

  return (
    <>
      <Container>
        <Avatar src={avatarUrl} size="3rem" />
        <CodeBlock onClick={() => setShowModal(true)}>
          Write some code here...
        </CodeBlock>
      </Container>

      {showModal && (
        <Modal onMouseDown={() => setShowModal(false)}>
          <Card
            width="70%"
            maxWidth="1000px"
            height="60%"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ToprightIcon icon={faTimes} onClick={() => setShowModal(false)} />
            <Header center>Create a new Snibbet</Header>
            <TextInput
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
            <TextInput
              textArea
              flex
              label="Body"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
              placeholder="Write your code here..."
            />
            <Button
              onClick={handleSubmit}
              disabled={title.length === 0 || content.length === 0}
            >
              Post Snibbet
            </Button>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default NewSnippet;
