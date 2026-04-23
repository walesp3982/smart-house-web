import { Box, Typography } from "@mui/material";
import React from "react";

interface DeviceItemProps {
    indentLevel?: 0 | 1 | 2
    onEdit: () => void
    device_name: string
    active: boolean
    device_icon: React.ReactElement
    color: StatusColor
}

const colorMap: Record<StatusColor, string> = {
    green: "success.main",
    yellow: "warning.main",
    red: "error.main",
};

export type StatusColor = "red" | "yellow" | "green"


export function DeviceItem({
    indentLevel, onEdit, device_name, active = true, device_icon, color = "green"
}: DeviceItemProps) {
    const paddingLeft = indentLevel === 0 ? 1.5 : indentLevel === 1 ? 3 : 4.5;

    return (
        <Box
            onClick={() => onEdit()}
            display="flex"
            alignItems="center"
            gap={1.5}
            sx={{
                pl: paddingLeft,
                pr: 1.5,
                py: 1,
                borderRadius: 1,
                bgcolor: "action.hover",
                "&:hover": { bgcolor: "action.selected", cursor: "pointer" },
            }}

        >
            {device_icon}
            <Typography variant="body2" flex={1}>
                {device_name}
            </Typography>
            {/* badge de estado */}
            <Box
                sx={{
                    width: 8, height: 8, borderRadius: "50%",
                    bgcolor: active ? colorMap[color] : "text.disabled",
                }}
            />
        </Box>
    )
}