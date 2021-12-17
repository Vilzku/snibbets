import {
  faEdit,
  faEllipsisH,
  faReply,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import {
  BottomInfo,
  CommentContainer,
  ConfirmModal,
  Container,
  MenuIcon,
  MenuIconContainer,
  TextContainer,
  UpperContainer,
} from ".";
import {
  Avatar,
  Icon,
  Menu,
  MenuItem,
  SubmitIcon,
  TextInput,
} from "../../../../components";
import { editComment } from "../../../../utils/api/comments";
import { getImage, getUserInfo } from "../../../../utils/api/users";
import { CommentType, UserType } from "../../../../utils/types";
import avatarPlaceholder from "../../../../assets/images/avatar-placeholder.webp";

interface Props {
  comment: CommentType;
  userId: string | undefined;
  removeComment: (commentId: string) => void;
  updateComment: (comment: CommentType) => void;
}

const Comment: React.FC<Props> = ({
  comment,
  userId,
  removeComment,
  updateComment,
}) => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [avatarUrl, setAvatarUrl] = React.useState<string>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>(comment.content);

  const numberOfLines = textInput.split("\n").length || 1;

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo(comment.userId);
      if (data) setUser(data);
    };
    getData();
  }, [comment.userId]);

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

  const handleSubmit = async () => {
    if (textInput.length === 0) return;
    try {
      const data = await editComment(comment.snippetId, comment.id, textInput);
      if (data) updateComment(data);
      setShowEdit(false);
      setTextInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UpperContainer>
        <Avatar src={avatarUrl} size="2.5rem" />
        <Container>
          <CommentContainer>
            {showEdit ? (
              <TextInput
                textArea
                flex
                noMargin
                value={textInput}
                placeholder="Write a comment..."
                onChange={(e) => setTextInput(e.target.value)}
                rows={numberOfLines}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            ) : (
              <TextContainer>
                <b>{user.username}</b>
                {comment.content}
              </TextContainer>
            )}

            {comment.userId === userId && (
              <MenuIconContainer>
                {!showEdit ? (
                  <MenuIcon
                    icon={faEllipsisH}
                    onClick={() => setShowMenu(!showMenu)}
                  />
                ) : (
                  <SubmitIcon
                    icon={faReply}
                    onClick={handleSubmit}
                    style={{ marginLeft: "0.5rem" }}
                  />
                )}

                {/* Menu */}
                {showMenu && (
                  <Menu closeMenu={() => setShowMenu(false)}>
                    <MenuItem
                      onClick={() => {
                        setShowEdit(true);
                        setShowMenu(false);
                      }}
                    >
                      <Icon icon={faEdit} />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setShowDeleteModal(true);
                        setShowMenu(false);
                      }}
                    >
                      <Icon icon={faTrash} />
                      Delete
                    </MenuItem>
                  </Menu>
                )}
              </MenuIconContainer>
            )}
          </CommentContainer>

          <BottomInfo
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
            userId={userId}
            commentId={comment.id}
          />
        </Container>
      </UpperContainer>

      {/* Modal for confirming deletion */}
      {comment.userId === userId && removeComment && (
        <ConfirmModal
          comment={comment}
          show={showDeleteModal}
          close={() => setShowDeleteModal(false)}
          removeComment={removeComment}
        />
      )}
    </>
  );
};

export default Comment;
