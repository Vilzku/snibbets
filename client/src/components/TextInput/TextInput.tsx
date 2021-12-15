import React from "react";
import { Container, SubText, Input, Label, TextArea } from ".";

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  name?: string;
  hint?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  textArea?: boolean;
  flex?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  noMargin?: boolean;
  rows?: number;
  onKeyDown?: (e: any) => void;
}

const TextInput: React.FC<Props> = (props) => {
  const { label, hint, error, flex, textArea, noMargin } = props;
  return (
    <Container flex={flex} noMargin={noMargin}>
      {label && <Label>{label}</Label>}

      {textArea ? <TextArea {...props} /> : <Input {...props} />}

      {error && <SubText error>{error}</SubText>}
      {hint && <SubText>{hint}</SubText>}
    </Container>
  );
};

export default TextInput;
