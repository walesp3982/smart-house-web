"use client";

import { Box } from "@mui/material";
import { ChatPanel } from "./ChatPanel";
export default function Page() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        p: 2,
      }}
    >
      <ChatPanel />
    </Box>
  );
}
