import React from "react";
import {
  FormControl,
  Input,
  FormControlProps,
  FormLabel,
  InputProps,
  Textarea,
  TextareaProps,
  FormHelperText,
  Text,
} from "@chakra-ui/react";

const FormInput = ({
  label,
  inputProps,
  textAreaProps,
  textField,
  helperText,
  ...rest
}: FormInputProps) => {
  return (
    <FormControl {...rest}>
      <FormLabel>
        <Text as="h3">{label}</Text>
      </FormLabel>
      {textField ? <Textarea {...textAreaProps} /> : <Input {...inputProps} />}
      <FormHelperText>{helperText} </FormHelperText>
    </FormControl>
  );
};

export default FormInput;
interface FormInputProps extends FormControlProps {
  inputProps?: InputProps;
  textField?: boolean;
  textAreaProps?: TextareaProps;
  helperText?: string;
}
