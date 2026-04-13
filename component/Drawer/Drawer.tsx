import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close"
import React from "react";

interface AppDrawerProps {
    open: boolean
    onClose: () => void
    icon?: React.ReactElement
    title: string
    subtitle?: string
    onSubmit: () => void
    children: React.ReactNode
}
export default function AppDrawer({ open, onClose, icon, title, subtitle, onSubmit, children }: AppDrawerProps) {
    // TODO: Realizar implementación de icon
    return (
        <Drawer anchor="right" open={open} onClose={onClose}
            slotProps={{
                paper: {
                    sx: { width: { xs: "100%", sm: 400 }, p: 3 }
                }
            }}
            elevation={0}
        >
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box>
                    <Typography variant="h6">{title}</Typography>
                    {subtitle && (
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {subtitle}
                        </Typography>)
                    }
                </Box>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3} component="form" onSubmit={onSubmit}>
                {/* Nombre */}
                {children}

                {/* Actions */}
                <Box display="flex" gap={1} mt="auto">
                    <Button fullWidth onClick={onClose}>Cancelar</Button>
                    <Button fullWidth variant="contained" type="submit">Guardar</Button>
                </Box>
            </Stack>
        </Drawer>
    )
}