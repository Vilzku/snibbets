import React, { useRef, useState } from "react";
import { Avatar, Button } from "../../../components";
import { uploadImage } from "../../../utils/api/users";
import avatarPlaceholder from "../../../assets/images/avatar-placeholder.webp";
import { useNavigate } from "react-router-dom";
import { SubText } from "../../../components/TextInput";

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<String>();

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const upload = async () => {
    if (image) {
      if (image.size > 1024 * 1024 * 5 - 1)
        return setError("Image size should be less than 5MB");

      try {
        const success = await uploadImage(image);
        if (!success) throw new Error();
        return true;
      } catch (error) {
        setError("Image upload failed, try again or skip for now");
        return false;
      }
    }
    return false;
  };

  const handleClick = async () => {
    if (!image) (inputRef.current as any).click();
    else {
      if (await upload()) {
        navigate("/home", { replace: true });
      }
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {/* TODO: Header */}
        Upload a profile picture to make your profile look more like you!
      </div>
      <br />
      <Avatar
        src={image ? URL.createObjectURL(image) : avatarPlaceholder}
        alt="uploaded"
        size="90%"
        border
        onClick={() => (inputRef.current as any).click()}
        center
      />
      <br />
      <Button onClick={handleClick}>
        {!image ? "Upload" : error ? "Try again" : "Continue"}
      </Button>
      <SubText>
        {"You can change the picture by clicking on the image above."}
      </SubText>
      {error && error}

      <input
        id="imageinput"
        type="file"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        ref={inputRef}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImageUpload;
