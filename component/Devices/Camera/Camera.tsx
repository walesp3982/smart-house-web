'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Box, Typography } from '@mui/material';

interface DraggableVideoDialogProps {
    streamUrl: string;
    title?: string;
    open: boolean;
    onClose: () => void;
}

const INITIAL_POS = { x: 80, y: 80 };
const INITIAL_SIZE = { w: 360, h: 'auto' as const };

export default function DraggableVideoDialog({
    streamUrl,
    title = 'Stream',
    open,
    onClose,
}: DraggableVideoDialogProps) {
    const [pos, setPos] = useState(INITIAL_POS);
    const [minimized, setMinimized] = useState(false);
    const dragRef = useRef({ active: false, startX: 0, startY: 0, ox: 0, oy: 0 });

    const onTitlebarMouseDown = useCallback((e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        const d = dragRef.current;
        d.active = true;
        d.startX = e.clientX;
        d.startY = e.clientY;
        d.ox = pos.x;
        d.oy = pos.y;
        e.preventDefault();
    }, [pos]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const d = dragRef.current;
            if (!d.active) return;
            setPos({
                x: d.ox + (e.clientX - d.startX),
                y: d.oy + (e.clientY - d.startY),
            });
        };
        const onUp = () => { dragRef.current.active = false; };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
    }, []);

    if (!open) return null;

    return (
        <Paper
            elevation={8}
            sx={{
                position: 'fixed',
                top: pos.y,
                left: pos.x,
                width: INITIAL_SIZE.w,
                zIndex: 1400,           // sobre Drawer/AppBar de MUI
                borderRadius: 2,
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            {/* Titlebar */}
            <Box
                onMouseDown={onTitlebarMouseDown}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.75,
                    bgcolor: 'grey.900',
                    cursor: 'grab',
                    '&:active': { cursor: 'grabbing' },
                    gap: 1,
                }}
            >
                <VideocamIcon sx={{ fontSize: 16, color: 'grey.400' }} />
                <Typography
                    variant="caption"
                    sx={{ flex: 1, color: 'grey.300', fontWeight: 500 }}
                >
                    {title}
                </Typography>

                <Tooltip title="Minimizar">
                    <IconButton size="small" onClick={() => setMinimized(v => !v)}
                        sx={{ color: 'grey.400', p: 0.25 }}>
                        <RemoveIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Cerrar">
                    <IconButton size="small" onClick={onClose}
                        sx={{ color: 'grey.400', p: 0.25 }}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Video area */}
            {!minimized && (
                <Box sx={{ bgcolor: '#000', lineHeight: 0 }}>
                    <img
                        src={streamUrl}
                        alt="stream"
                        style={{ width: '100%', display: 'block', aspectRatio: '16/9' }}
                    />
                </Box>
            )}
        </Paper>
    );
}