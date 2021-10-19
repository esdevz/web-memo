import React from "react";
import {
  FormControl,
  Input,
  FormControlProps,
  FormLabel,
  InputProps,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

const FormInput = ({
  id,
  inputProps,
  textAreaProps,
  textField,
  ...rest
}: FormInputProps) => {
  return (
    <FormControl {...rest}>
      <FormLabel>{id}</FormLabel>
      {textField ? <Textarea {...textAreaProps} /> : <Input {...inputProps} />}
    </FormControl>
  );
};

export default FormInput;

interface FormInputProps extends FormControlProps {
  inputProps?: InputProps;
  textField?: boolean;
  textAreaProps?: TextareaProps;
}
