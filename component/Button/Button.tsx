// components/Button.tsx
import Button from "@mui/material/Button";

type Props = {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function MyButton({
  children: label,
  disabled = false,
  onClick,
}: Props) {
  return (
    <Button variant="contained" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}
