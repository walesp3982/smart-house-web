import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PasswordIcon from "../../Icons/Password";
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
  name?: string;
}
export default function PasswordFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ field, fieldState, name }: PasswordFieldProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const label = typeof name === "undefined" ? "Password" : name;
  return (
    <FormControl variant="outlined" error={!!fieldState.error}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <PasswordIcon
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
          ></PasswordIcon>
        }
        label={label}
        {...field}
      />
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
