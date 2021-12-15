import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal } from ".";
import { Button, Card, Header, ToprightIcon } from ".";
import { deleteSnippet } from "../utils/api/snippets";
import { SnippetType } from "../utils/types";

interface Props {
  removeSnippet: (id: string) => void;
  snippet: SnippetType;
  show: boolean;
  close: () => void;
}

const DeleteSnippet: React.FC<Props> = ({
  removeSnippet,
  snippet,
  show,
  close,
}) => {
  const handleSubmit = async () => {
    try {
      const data = await deleteSnippet(snippet.id);
      if (data) {
        removeSnippet(snippet.id);
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
            // width="70%"
            // maxWidth="1000px"
            // height="60%"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ToprightIcon icon={faTimes} onClick={close} />
            <Header center>Snibbet deletion</Header>
            <br />
            Are you sure you want to delete Snibbet
            {' "' + snippet.title + '"'}
            <br />
            <br />
            <div>
              <Button onClick={handleSubmit}>Delete</Button>
              <Button grey onClick={close}>
                Cancel
              </Button>
            </div>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default DeleteSnippet;
