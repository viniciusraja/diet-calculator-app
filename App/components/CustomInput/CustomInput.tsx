import {
  FormControl,
  FormControlError,
  Input,
  InputField,
  FormControlErrorText,
} from "@gluestack-ui/themed";
import { useController } from "react-hook-form";

type CustomInputProps = {
  name: string;
};

const CustomInput = ({ name }: CustomInputProps) => {
  const {
    field: { onChange, ...inputField },
    formState: { errors },
  } = useController({ name });

  const inputErrorMessage = errors[name]?.message as string;
  return (
    <FormControl
      size="md"
      isDisabled={false}
      isInvalid={!!inputErrorMessage}
      isReadOnly={false}
      minWidth="$80"
    >
      <Input variant="outline">
        <InputField
          {...inputField}
          placeholder="Enter Text here"
          onChangeText={onChange}
        />
      </Input>
      <FormControlError>
        <FormControlErrorText>{inputErrorMessage}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default CustomInput;
