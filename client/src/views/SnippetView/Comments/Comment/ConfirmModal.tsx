import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
  Button,
  Card,
  Header,
  Modal,
  ToprightIcon,
} from "../../../../components";
import { deleteComment } from "../../../../utils/api/comments";
import { CommentType } from "../../../../utils/types";

interface Props {
  removeComment: (id: string) => void;
  comment: CommentType;
  show: boolean;
  close: () => void;
}

const ConfirmModal: React.FC<Props> = ({
  removeComment,
  comment,
  show,
  close,
}) => {
  const handleSubmit = async () => {
    try {
      const data = await deleteComment(comment.snippetId, comment.id);
      if (data) {
        removeComment(comment.id);
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
          <Card onMouseDown={(e) => e.stopPropagation()}>
            <ToprightIcon icon={faTimes} onClick={close} />
            <Header center>Comment deletion</Header>
            <br />
            Are you sure you want to delete this comment?
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

export default ConfirmModal;
