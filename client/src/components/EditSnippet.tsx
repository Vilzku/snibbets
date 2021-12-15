import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal } from ".";
import { Button, Card, Header, TextInput, ToprightIcon } from ".";
import { putSnippet } from "../utils/api/snippets";
import { SnippetType } from "../utils/types";

interface Props {
  updateSnippet: (updatedSnippet: SnippetType) => void;
  snippet: SnippetType;
  show: boolean;
  close: () => void;
}

const EditSnippet: React.FC<Props> = ({
  updateSnippet,
  snippet,
  show,
  close,
}) => {
  const [title, setTitle] = React.useState(snippet.title);
  const [content, setContent] = React.useState(snippet.content);

  const handleSubmit = async () => {
    try {
      const data = await putSnippet(snippet.id, title, content);
      if (data) {
        updateSnippet(data);
        close();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      {show && (
        <Modal onMouseDown={close}>
          <Card
            width="70%"
            maxWidth="1000px"
            height="60%"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ToprightIcon icon={faTimes} onClick={close} />
            <Header center>Edit your Snibbet</Header>
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
              Update Snibbet
            </Button>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default EditSnippet;
