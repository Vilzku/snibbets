import React from "react";
import { Container, SubText, Input, Label } from ".";

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  name?: string;
  hint?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  type,
  name,
  hint,
  error,
  onChange,
}) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}

      <Input
        placeholder={placeholder}
        value={value}
        type={type}
        name={name}
        onChange={onChange}
      />

      {error && <SubText error>{error}</SubText>}
      {hint && <SubText>{hint}</SubText>}
    </Container>
  );
};

export default TextInput;
