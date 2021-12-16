import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Header,
  Modal,
  TextInput,
  ToprightIcon,
} from "../../components";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.png";
import { patchUser, uploadImage } from "../../utils/api/users";
import { SubText } from "../../components/TextInput";
import { ImageUploadContainer } from ".";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserType } from "../../utils/types";

interface Props {
  close: () => void;
  show: boolean;
  user: UserType;
  updateUser: (updatedUser: UserType) => void;
  avatarUrl: string | undefined;
}

const EditUserModal: React.FC<Props> = ({
  show,
  close,
  user,
  updateUser,
  avatarUrl,
}) => {
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<String>();
  const inputRef = useRef(null);

  const handleClick = async () => {
    (inputRef.current as any).click();
  };

  const handleSubmit = async () => {
    if (image) {
      try {
        const success = await uploadImage(image);
        if (!success) throw new Error();
      } catch (error) {
        setError("Image upload failed, try again");
        return;
      }
    }

    try {
      const data = await patchUser(username, email, bio);
      if (data) {
        updateUser(data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      {show && (
        <Modal>
          <Card width="30rem">
            <ToprightIcon icon={faTimes} onClick={close} />

            <Header>Edit user</Header>

            <ImageUploadContainer>
              <Avatar
                src={
                  image
                    ? URL.createObjectURL(image)
                    : avatarUrl
                    ? avatarUrl
                    : avatarPlaceholder
                }
                alt="uploaded"
                size="10rem"
                border
                onClick={() => (inputRef.current as any).click()}
                center
              />
              <br />
              <Button onClick={handleClick}>
                {!image ? "Choose image" : error ? "Try again" : "Choose again"}
              </Button>
              <SubText>
                {"You can change the picture by clicking on the image above."}
              </SubText>
              {error && error}

              <input
                id="imageinput"
                type="file"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                ref={inputRef}
                style={{ display: "none" }}
              />
            </ImageUploadContainer>

            <TextInput
              label="Display name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label="Bio"
              textArea
              rows={8}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <Button onClick={handleSubmit}>Save changes</Button>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default EditUserModal;
