import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PasswordIcon from "../Icons/Password";
import { useState } from "react";

export default function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
      />
    </FormControl>
  );
}
