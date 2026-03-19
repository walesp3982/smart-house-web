import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PasswordIcon from "../Icons/Password";
import { useState } from "react";

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

interface PasswordFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
}
export default function PasswordFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ field, fieldState }: PasswordFieldProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);
  return (
    <FormControl variant="outlined">
      <InputLabel
        htmlFor="outlined-adornment-password"
        error={!!fieldState.error}
      >
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <PasswordIcon
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
          ></PasswordIcon>
        }
        label="Password"
        {...field}
      />
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
