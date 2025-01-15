import TextField, { TextFieldProps } from "@design/Form/TextField";
import { Control, useController } from "react-hook-form";

type User = {
  name: string;
  email: string;
};

const ControlledTextField = (
  props: Omit<TextFieldProps, "value" | "onChangeText"> & { control: Control<any> }
) => {
  const {
    field,
    formState: { errors },
  } = useController(props);

  const { name } = props;

  return (
    <TextField
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={errors[name]?.message as string}
    />
  );
};

export default ControlledTextField;
