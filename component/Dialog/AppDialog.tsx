// components/ui/AppDialog.tsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import React from "react";

interface AppDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    maxWidth?: "xs" | "sm" | "md";
    onSubmit?: React.SubmitEventHandler<HTMLFormElement>;  // 👈 nuevo
}

export function AppDialog({
    open,
    onClose,
    title,
    description,
    children,
    actions,
    maxWidth = "xs",
    onSubmit,
}: AppDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={maxWidth}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "16px",
                        border: "0.5px solid",
                        borderColor: "divider",
                        boxShadow: "none",
                        backgroundImage: "none",
                    },
                },
                backdrop: {
                    sx: { backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.3)" },
                },
            }}
        >
            <Box
                component={onSubmit ? "form" : "div"}
                onSubmit={onSubmit}
                noValidate
            >
                {/* HEADER */}
                <DialogTitle
                    sx={{
                        px: 3,
                        pt: 3,
                        pb: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 1,
                    }}
                >
                    <div>
                        <Typography fontWeight={500} fontSize={16}>
                            {title}
                        </Typography>
                        {description && (
                            <Typography fontSize={13} color="text.secondary" mt={0.5}>
                                {description}
                            </Typography>
                        )}
                    </div>
                    <IconButton size="small" onClick={onClose} sx={{ mt: -0.5, mr: -1 }}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogTitle>

                {/* CONTENT */}
                <DialogContent sx={{ px: 3, pt: 2.5, pb: 1 }}>
                    {children}
                </DialogContent>

                {/* ACTIONS */}
                {actions && (
                    <DialogActions
                        sx={{
                            px: 3,
                            py: 2,
                            borderTop: "0.5px solid",
                            borderColor: "divider",
                            gap: 1,
                        }}
                    >
                        {actions}
                    </DialogActions>
                )}
            </Box>
        </Dialog>
    );
}