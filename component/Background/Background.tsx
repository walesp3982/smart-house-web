import { ReactNode } from "react";
import Box from "@mui/material/Box";
interface propsBackground {
  children: ReactNode;
}

export default function Background({ children }: propsBackground) {
  return (
    // <div className={styles.container}>
    <Box
      sx={{
        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
    // </div>
  );
}
