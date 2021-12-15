import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal } from ".";
import { Button, Card, Header, Snippet, TextInput, ToprightIcon } from ".";
import { postSnippet } from "../utils/api/snippets";
import { SnippetType } from "../utils/types";

interface Props {
  addNewSnippet: (newSnippet: SnippetType) => void;
  userId: string | undefined;
}

const NewSnippet: React.FC<Props> = ({ addNewSnippet, userId }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = async () => {
    try {
      const snippet = await postSnippet(title, content);
      if (snippet) {
        addNewSnippet(snippet);
        setShowModal(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Snippet
        id=""
        newSnippet={true}
        onNewSnippetClick={() => setShowModal(true)}
        userId={userId}
      />

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
