import { faReply } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { CommentCard, Comment, NewCommentContainer } from ".";
import { Avatar, Divider, SubmitIcon, TextInput } from "../../../components";
import { getComments, postComment } from "../../../utils/api/comments";
import { getImage } from "../../../utils/api/users";
import { CommentType } from "../../../utils/types";
import avatarPlaceholder from "../../../assets/images/avatar-placeholder.webp";

interface Props {
  snippetId: string;
  userId: string | undefined;
}

const Comments: React.FC<Props> = ({ snippetId, userId }) => {
  const [comments, setComments] = useState<CommentType[]>([] as CommentType[]);
  const [avatarUrl, setAvatarUrl] = React.useState<string>();
  const [textInput, setTextInput] = useState<string>("");
  const numberOfLines = textInput.split("\n").length || 1;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getComments(snippetId);
        if (data) setComments(data);
      } catch (error) {
        console.log(error);
        // TODO: !!! Error handling?
      }
    };
    getData();
  }, [snippetId]);

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

  const handleSubmit = async () => {
    const sendComment = async () => {
      try {
        const data = await postComment(snippetId, textInput);
        if (data) setComments([data, ...comments]);
        setTextInput("");
      } catch (error) {
        console.log(error);
      }
    };
    if (textInput.length > 0) sendComment();
  };

  const removeComment = async (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const updateComment = (comment: CommentType) => {
    setComments(comments.map((c) => (c.id === comment.id ? comment : c)));
  };

  return (
    <CommentCard>
      <NewCommentContainer>
        <Avatar src={avatarUrl} size="2.5rem" />
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
        <SubmitIcon icon={faReply} onClick={handleSubmit} />
      </NewCommentContainer>
      <Divider />
      {comments.length === 0 && (
        <p>There are no comments. Be first to comment!</p>
      )}
      {comments.map((comment) => (
        <Comment
          comment={comment}
          userId={userId}
          removeComment={removeComment}
          updateComment={updateComment}
        />
      ))}
    </CommentCard>
  );
};

export default Comments;
