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
        background: "linear-gradient(#00c6ff, #0072ff, #8e2de2)",
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
