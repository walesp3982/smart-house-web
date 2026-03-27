'use client';
import React, { useState, useMemo } from 'react';
import { 
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Typography, TextField, Button, Avatar, 
  Paper, Select, MenuItem, InputLabel, FormControl, Stack,
  IconButton, createTheme, ThemeProvider
} from '@mui/material';
import { 
  Home as HomeIcon, Devices as DeviceIcon, 
  Timeline as TimelineIcon, Settings as SettingsIcon, AddCircleOutline as AddIcon,
  DarkMode, LightMode
} from '@mui/icons-material';

const drawerWidth = 260;

export default function DashboardPremium() {
  const [darkMode, setDarkMode] = useState(false);

  // Crear tema basado en el modo (sin propiedades personalizadas inválidas)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#0f172a' : '#f4f6f8',
            paper: darkMode ? '#1e293b' : '#ffffff',
          },
          primary: {
            main: '#111827',
          },
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: darkMode ? '#0f172a' : '#111827',
                color: darkMode ? '#cbd5e1' : '#9ca3af',
                borderRight: 'none',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Elementos del menú
  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, active: true },
    { text: 'Dispositivos', icon: <DeviceIcon />, active: false },
    { text: 'Seguimiento', icon: <TimelineIcon />, active: false },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              // Los colores ya están definidos en components.MuiDrawer.styleOverrides
            },
          }}
        >
          <Box sx={{ p: 3, color: 'white' }}>
            <Typography variant="h6" fontWeight="bold">✨"Tu Casa Inteligente"✨</Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>Panel de Control IoT</Typography>
          </Box>

          <List sx={{ px: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    bgcolor: item.active ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: item.active ? 'white' : 'inherit',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', color: 'white' },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: item.active ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box
            sx={{
              mt: 'auto',
              p: 2,
              bgcolor: darkMode ? '#1e293b' : '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar sx={{ bgcolor: '#374151', width: 32, height: 32 }}>A</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="white" display="block">
                Admin
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.5 }}>
                Configuración
              </Typography>
            </Box>
            <IconButton onClick={toggleDarkMode} sx={{ color: 'white' }}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <SettingsIcon
              sx={{ fontSize: 20, cursor: 'pointer', '&:hover': { color: 'white' } }}
            />
          </Box>
        </Drawer>

        {/* CONTENIDO PRINCIPAL */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 6,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 6,
              width: '100%',
              maxWidth: 550,
              borderRadius: 6,
              boxShadow: darkMode
                ? '0 10px 40px rgba(0,0,0,0.3)'
                : '0 10px 40px rgba(0,0,0,0.04)',
              textAlign: 'center',
              border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h3"
              fontWeight="800"
              sx={{ mb: 1, color: darkMode ? '#f1f5f9' : '#111827' }}
            >
              Bienvenido
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Ingrese el código de dispositivo
            </Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Código de dispositivo"
                variant="filled"
                placeholder="Ej: SH-2024-XXXX"
                sx={{
                  bgcolor: darkMode ? '#1e293b' : '#f9fafb',
                  borderRadius: 2,
                  '& .MuiFilledInput-root': { bgcolor: 'transparent' },
                  '& .MuiInputLabel-root': { color: darkMode ? '#94a3b8' : undefined },
                }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ bgcolor: darkMode ? '#1e293b' : '#f9fafb', borderRadius: 2 }}
                >
                  <InputLabel>Seleccionar casa</InputLabel>
                  <Select label="Seleccionar casa" defaultValue="">
                    <MenuItem value={1}>🏠 Casa Principal</MenuItem>
                    <MenuItem value={2}>🏢 Oficina</MenuItem>
                    <MenuItem value={3}>🏡 Casa de Campo</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    px: 3,
                    borderColor: darkMode ? '#475569' : '#d1d5db',
                    color: darkMode ? '#e2e8f0' : '#374151',
                  }}
                >
                  Nueva Casa
                </Button>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: darkMode ? '#1e293b' : '#111827',
                  color: 'white',
                  py: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  boxShadow: darkMode
                    ? '0 4px 14px rgba(0,0,0,0.5)'
                    : '0 4px 14px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: darkMode ? '#0f172a' : '#000',
                    boxShadow: darkMode
                      ? '0 6px 20px rgba(0,0,0,0.7)'
                      : '0 6px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                Agregar dispositivo
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}