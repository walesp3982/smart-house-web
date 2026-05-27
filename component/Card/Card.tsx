// import styles from "./styles.module.css";
import Box from "@mui/material/Box";

interface propsCard {
  children: React.ReactNode;
}
export default function Card({ children }: propsCard) {
  // return <div className={styles.card}>{children}</div>;
  return (
    <Box
      sx={{
        // backgroundColor: "#1f4b57",
        backgroundColor: "#05070A",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      {children}
    </Box>
  );
}
