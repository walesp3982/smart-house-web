import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface propsPasswordIcon {
  showPassword: boolean;
  handleClickShowPassword: () => void;
}
export default function PasswordIcon({
  showPassword,
  handleClickShowPassword,
}: propsPasswordIcon) {
  const handleMouseDownPassword = () => {};
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label={showPassword ? "hide the password" : "display the password"}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
