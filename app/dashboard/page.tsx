'use client';
import React, { useState, useMemo } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, TextField, Button, Avatar,
  Paper, Select, MenuItem, InputLabel, FormControl, Stack,
  IconButton, createTheme, ThemeProvider, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert, Snackbar
} from '@mui/material';
import {
  Home as HomeIcon, Devices as DeviceIcon,
  Timeline as TimelineIcon, Settings as SettingsIcon, AddCircleOutline as AddIcon,
  DarkMode, LightMode, Edit as EditIcon, Delete as DeleteIcon
} from '@mui/icons-material';

const drawerWidth = 260;

// Traducciones
const translations = {
  es: {
    appName: '✨Tu casa inteligente✨',
    appSubtitle: 'Panel de Control',
    menuInicio: 'Inicio',
    menuDispositivos: 'Dispositivos',
    menuSeguimiento: 'Seguimiento',
    welcome: 'Bienvenido',
    enterDeviceCode: 'Ingrese el código de dispositivo',
    deviceCodeLabel: 'Código de dispositivo',
    deviceCodePlaceholder: 'Ej: SH-2024-XXXX',
    deviceDescriptionLabel: 'Descripción (opcional)',
    deviceDescriptionPlaceholder: 'Ej: Termostato sala',
    selectHouseLabel: 'Seleccionar casa',
    newHouseButton: 'Nueva Casa',
    addDeviceButton: 'Agregar dispositivo',
    myDevices: 'Mis Dispositivos',
    noDevices: 'No tienes dispositivos agregados aún.',
    houseLabel: 'Casa',
    addedLabel: 'Agregado',
    editDevice: 'Editar Dispositivo',
    deviceCodeEditLabel: 'Código del dispositivo',
    deleteConfirmTitle: 'Confirmar eliminación',
    deleteConfirmMessage: '¿Estás seguro de que deseas eliminar el dispositivo "{device}"?',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    save: 'Guardar',
    add: 'Agregar',
    settings: 'Configuración',
    userPreferences: 'Preferencias del usuario',
    nameLabel: 'Nombre',
    emailLabel: 'Email',
    languageLabel: 'Idioma',
    spanish: 'Español',
    english: 'English',
    close: 'Cerrar',
    newHouseDialogTitle: 'Nueva Casa',
    houseNameLabel: 'Nombre de la casa',
    houseDescriptionLabel: 'Descripción (opcional)',
    trackingTitle: 'Seguimiento de Actividad',
    trackingDescription: 'Aquí podrás ver estadísticas y eventos de tus dispositivos.',
    trackingPlaceholder: 'Gráficos y métricas próximamente.',
    snackbarDeviceAdded: 'Dispositivo agregado correctamente',
    snackbarDeviceUpdated: 'Dispositivo actualizado',
    snackbarDeviceDeleted: 'Dispositivo eliminado',
    snackbarHouseAdded: 'Casa "{name}" agregada',
    snackbarSettingsSaved: 'Configuración guardada',
    snackbarErrorDeviceCode: 'Por favor ingresa un código de dispositivo',
    snackbarErrorSelectHouse: 'Selecciona una casa',
    snackbarErrorHouseName: 'Ingresa un nombre para la casa',
    snackbarErrorEmptyCode: 'El código no puede estar vacío',
  },
  en: {
    appName: '✨Your smart home✨',
    appSubtitle: 'Control Panel',
    menuInicio: 'Home',
    menuDispositivos: 'Devices',
    menuSeguimiento: 'Tracking',
    welcome: 'Welcome',
    enterDeviceCode: 'Enter device code',
    deviceCodeLabel: 'Device code',
    deviceCodePlaceholder: 'Ex: SH-2024-XXXX',
    deviceDescriptionLabel: 'Description (optional)',
    deviceDescriptionPlaceholder: 'Ex: Living room thermostat',
    selectHouseLabel: 'Select house',
    newHouseButton: 'New House',
    addDeviceButton: 'Add device',
    myDevices: 'My Devices',
    noDevices: "You don't have any devices yet.",
    houseLabel: 'House',
    addedLabel: 'Added',
    editDevice: 'Edit Device',
    deviceCodeEditLabel: 'Device code',
    deleteConfirmTitle: 'Confirm deletion',
    deleteConfirmMessage: 'Are you sure you want to delete the device "{device}"?',
    cancel: 'Cancel',
    delete: 'Delete',
    save: 'Save',
    add: 'Add',
    settings: 'Settings',
    userPreferences: 'User preferences',
    nameLabel: 'Name',
    emailLabel: 'Email',
    languageLabel: 'Language',
    spanish: 'Spanish',
    english: 'English',
    close: 'Close',
    newHouseDialogTitle: 'New House',
    houseNameLabel: 'House name',
    houseDescriptionLabel: 'Description (optional)',
    trackingTitle: 'Activity Tracking',
    trackingDescription: 'Here you can see statistics and events of your devices.',
    trackingPlaceholder: 'Charts and metrics coming soon.',
    snackbarDeviceAdded: 'Device added successfully',
    snackbarDeviceUpdated: 'Device updated',
    snackbarDeviceDeleted: 'Device deleted',
    snackbarHouseAdded: 'House "{name}" added',
    snackbarSettingsSaved: 'Settings saved',
    snackbarErrorDeviceCode: 'Please enter a device code',
    snackbarErrorSelectHouse: 'Select a house',
    snackbarErrorHouseName: 'Enter a house name',
    snackbarErrorEmptyCode: 'Code cannot be empty',
  }
};

// Interfaces
interface House {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface Device {
  id: number;
  code: string;
  description?: string;
  house: string;
  houseId?: number;
  addedAt: string;
}

interface UserProfile {
  name: string;
  email: string;
  language: 'es' | 'en';
}

export default function DashboardPremium() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<'inicio' | 'dispositivos' | 'seguimiento'>('inicio');

  const [deviceCode, setDeviceCode] = useState('');
  const [deviceDescription, setDeviceDescription] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const [houses, setHouses] = useState<House[]>([
    { id: 1, name: 'Casa Principal', description: 'Residencia principal', icon: '🏠' },
    { id: 2, name: 'Oficina', description: 'Oficina central', icon: '🏢' },
    { id: 3, name: 'Casa de Campo', description: 'Finca los pinos', icon: '🏡' },
  ]);
  const [devices, setDevices] = useState<Device[]>([]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Admin',
    email: 'admin@smarthome.com',
    language: 'es',
  });

  const [openNewHouseDialog, setOpenNewHouseDialog] = useState(false);
  const [newHouseName, setNewHouseName] = useState('');
  const [newHouseDescription, setNewHouseDescription] = useState('');
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openEditDeviceDialog, setOpenEditDeviceDialog] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
  const [editDeviceCode, setEditDeviceCode] = useState('');
  const [editDeviceDescription, setEditDeviceDescription] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Función de traducción
  const t = (key: keyof typeof translations.es) => {
    return translations[userProfile.language][key] || translations.es[key];
  };

  // Tema de Material-UI
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

  const menuItems = [
    { text: t('menuInicio'), icon: <HomeIcon />, id: 'inicio' as const },
    { text: t('menuDispositivos'), icon: <DeviceIcon />, id: 'dispositivos' as const },
    { text: t('menuSeguimiento'), icon: <TimelineIcon />, id: 'seguimiento' as const },
  ];

  const handleAddDevice = () => {
    if (!deviceCode.trim()) {
      setSnackbar({ open: true, message: t('snackbarErrorDeviceCode'), severity: 'error' });
      return;
    }
    if (!selectedHouse) {
      setSnackbar({ open: true, message: t('snackbarErrorSelectHouse'), severity: 'error' });
      return;
    }

    const house = houses.find(h => h.id === parseInt(selectedHouse));
    const newDevice: Device = {
      id: Date.now(),
      code: deviceCode,
      description: deviceDescription.trim() || undefined,
      house: house?.name || selectedHouse,
      houseId: house?.id,
      addedAt: new Date().toLocaleString(),
    };
    setDevices([...devices, newDevice]);
    setDeviceCode('');
    setDeviceDescription('');
    setSnackbar({ open: true, message: t('snackbarDeviceAdded'), severity: 'success' });
  };

  const handleAddNewHouse = () => {
    if (!newHouseName.trim()) {
      setSnackbar({ open: true, message: t('snackbarErrorHouseName'), severity: 'error' });
      return;
    }
    const newId = houses.length + 1;
    const newHouse: House = {
      id: newId,
      name: newHouseName,
      description: newHouseDescription.trim() || 'Sin descripción',
      icon: '🏠'
    };
    setHouses([...houses, newHouse]);
    setSelectedHouse(newId.toString());
    setNewHouseName('');
    setNewHouseDescription('');
    setOpenNewHouseDialog(false);
    setSnackbar({ open: true, message: t('snackbarHouseAdded').replace('{name}', newHouseName), severity: 'success' });
  };

  const handleEditDevice = (device: Device) => {
    setCurrentDevice(device);
    setEditDeviceCode(device.code);
    setEditDeviceDescription(device.description || '');
    setOpenEditDeviceDialog(true);
  };

  const handleSaveEditDevice = () => {
    if (!editDeviceCode.trim()) {
      setSnackbar({ open: true, message: t('snackbarErrorEmptyCode'), severity: 'error' });
      return;
    }
    const updatedDevices = devices.map(device =>
      device.id === currentDevice?.id
        ? {
            ...device,
            code: editDeviceCode,
            description: editDeviceDescription.trim() || undefined,
          }
        : device
    );
    setDevices(updatedDevices);
    setOpenEditDeviceDialog(false);
    setCurrentDevice(null);
    setEditDeviceCode('');
    setEditDeviceDescription('');
    setSnackbar({ open: true, message: t('snackbarDeviceUpdated'), severity: 'success' });
  };

  const handleDeleteDevice = (device: Device) => {
    setDeviceToDelete(device);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteDevice = () => {
    if (deviceToDelete) {
      const updatedDevices = devices.filter(device => device.id !== deviceToDelete.id);
      setDevices(updatedDevices);
      setDeleteConfirmOpen(false);
      setDeviceToDelete(null);
      setSnackbar({ open: true, message: t('snackbarDeviceDeleted'), severity: 'success' });
    }
  };

  const handleSaveSettings = () => {
    setSnackbar({ open: true, message: t('snackbarSettingsSaved'), severity: 'success' });
    setOpenSettingsDialog(false);
  };

  const handleOpenSettings = () => setOpenSettingsDialog(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              width: '100%',
              maxWidth: 550,
              borderRadius: 6,
              boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.04)',
              textAlign: 'center',
              border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h3" fontWeight="800" sx={{ mb: 1, color: darkMode ? '#f1f5f9' : '#111827' }}>
              {t('welcome')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {t('enterDeviceCode')}
            </Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label={t('deviceCodeLabel')}
                variant="filled"
                placeholder={t('deviceCodePlaceholder')}
                value={deviceCode}
                onChange={(e) => setDeviceCode(e.target.value)}
                sx={{
                  bgcolor: darkMode ? '#1e293b' : '#f9fafb',
                  borderRadius: 2,
                  '& .MuiFilledInput-root': { bgcolor: 'transparent' },
                  '& .MuiInputLabel-root': { color: darkMode ? '#94a3b8' : undefined },
                }}
              />
              <TextField
                fullWidth
                label={t('deviceDescriptionLabel')}
                variant="filled"
                placeholder={t('deviceDescriptionPlaceholder')}
                value={deviceDescription}
                onChange={(e) => setDeviceDescription(e.target.value)}
                sx={{
                  bgcolor: darkMode ? '#1e293b' : '#f9fafb',
                  borderRadius: 2,
                  '& .MuiFilledInput-root': { bgcolor: 'transparent' },
                  '& .MuiInputLabel-root': { color: darkMode ? '#94a3b8' : undefined },
                }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth variant="filled" sx={{ bgcolor: darkMode ? '#1e293b' : '#f9fafb', borderRadius: 2 }}>
                  <InputLabel>{t('selectHouseLabel')}</InputLabel>
                  <Select
                    value={selectedHouse}
                    onChange={(e) => setSelectedHouse(e.target.value)}
                    label={t('selectHouseLabel')}
                    renderValue={(value) => {
                      const house = houses.find(h => h.id === parseInt(value));
                      return house ? `${house.icon} ${house.name}` : '';
                    }}
                  >
                    {houses.map((house) => (
                      <MenuItem key={house.id} value={house.id} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Typography component="span" sx={{ mr: 1 }}>{house.icon}</Typography>
                          <Typography variant="body1">{house.name}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
                          {house.description}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenNewHouseDialog(true)}
                  sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    px: 3,
                    borderColor: darkMode ? '#475569' : '#d1d5db',
                    color: darkMode ? '#e2e8f0' : '#374151',
                  }}
                >
                  {t('newHouseButton')}
                </Button>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleAddDevice}
                sx={{
                  bgcolor: darkMode ? '#1e293b' : '#111827',
                  color: 'white',
                  py: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  boxShadow: darkMode ? '0 4px 14px rgba(0,0,0,0.5)' : '0 4px 14px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: darkMode ? '#0f172a' : '#000',
                    boxShadow: darkMode ? '0 6px 20px rgba(0,0,0,0.7)' : '0 6px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                {t('addDeviceButton')}
              </Button>
            </Stack>
          </Paper>
        );

      case 'dispositivos':
        return (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              width: '100%',
              maxWidth: 800,
              borderRadius: 6,
              boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.04)',
              border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: darkMode ? '#f1f5f9' : '#111827' }}>
              {t('myDevices')}
            </Typography>
            {devices.length === 0 ? (
              <Typography color="text.secondary">{t('noDevices')}</Typography>
            ) : (
              <Stack spacing={2}>
                {devices.map((device) => (
                  <Box
                    key={device.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: darkMode ? '#1e293b' : '#f9fafb',
                      border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {device.code}
                      </Typography>
                      {device.description && (
                        <Typography variant="body2" color="text.secondary">
                          {device.description}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary">
                        {t('houseLabel')}: {device.house} | {t('addedLabel')}: {device.addedAt}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditDevice(device)}
                        sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteDevice(device)}
                        sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>
        );

      case 'seguimiento':
        return (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              width: '100%',
              maxWidth: 800,
              borderRadius: 6,
              boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.04)',
              border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: darkMode ? '#f1f5f9' : '#111827' }}>
              {t('trackingTitle')}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {t('trackingDescription')}
            </Typography>
            <Box sx={{ p: 3, bgcolor: darkMode ? '#0f172a' : '#f1f5f9', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                {t('trackingPlaceholder')}
              </Typography>
            </Box>
          </Paper>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          <Box sx={{ p: 3, color: 'white' }}>
            <Typography variant="h6" fontWeight="bold">{t('appName')}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>{t('appSubtitle')}</Typography>
          </Box>

          <List sx={{ px: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => setActiveSection(item.id)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: activeSection === item.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: activeSection === item.id ? 'white' : 'inherit',
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
                      fontWeight: activeSection === item.id ? 600 : 400,
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
            <Avatar sx={{ bgcolor: '#374151', width: 32, height: 32 }}>
              {userProfile.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="white" display="block">
                {userProfile.name}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.5 }}>
                {userProfile.email}
              </Typography>
            </Box>
            <IconButton onClick={toggleDarkMode} sx={{ color: 'white' }}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton onClick={handleOpenSettings} sx={{ color: 'white' }}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Drawer>

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
          {renderContent()}
        </Box>
      </Box>

      {/* Diálogo Nueva Casa */}
      <Dialog open={openNewHouseDialog} onClose={() => setOpenNewHouseDialog(false)}>
        <DialogTitle>{t('newHouseDialogTitle')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('houseNameLabel')}
            fullWidth
            variant="outlined"
            value={newHouseName}
            onChange={(e) => setNewHouseName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label={t('houseDescriptionLabel')}
            fullWidth
            variant="outlined"
            value={newHouseDescription}
            onChange={(e) => setNewHouseDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewHouseDialog(false)}>{t('cancel')}</Button>
          <Button onClick={handleAddNewHouse} variant="contained">{t('add')}</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo Editar Dispositivo */}
      <Dialog open={openEditDeviceDialog} onClose={() => setOpenEditDeviceDialog(false)}>
        <DialogTitle>{t('editDevice')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('deviceCodeEditLabel')}
            fullWidth
            variant="outlined"
            value={editDeviceCode}
            onChange={(e) => setEditDeviceCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label={t('deviceDescriptionLabel')}
            fullWidth
            variant="outlined"
            value={editDeviceDescription}
            onChange={(e) => setEditDeviceDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDeviceDialog(false)}>{t('cancel')}</Button>
          <Button onClick={handleSaveEditDevice} variant="contained">{t('save')}</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo Confirmar Eliminación */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>{t('deleteConfirmTitle')}</DialogTitle>
        <DialogContent>
          <Typography>{t('deleteConfirmMessage').replace('{device}', deviceToDelete?.code || '')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>{t('cancel')}</Button>
          <Button onClick={confirmDeleteDevice} color="error" variant="contained">{t('delete')}</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo Configuración */}
      <Dialog open={openSettingsDialog} onClose={() => setOpenSettingsDialog(false)}>
        <DialogTitle>{t('settings')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={t('nameLabel')}
            fullWidth
            variant="outlined"
            value={userProfile.name}
            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label={t('emailLabel')}
            fullWidth
            variant="outlined"
            type="email"
            value={userProfile.email}
            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>{t('languageLabel')}</InputLabel>
            <Select
              label={t('languageLabel')}
              value={userProfile.language}
              onChange={(e) => setUserProfile({ ...userProfile, language: e.target.value as 'es' | 'en' })}
            >
              <MenuItem value="es">{t('spanish')}</MenuItem>
              <MenuItem value="en">{t('english')}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettingsDialog(false)}>{t('cancel')}</Button>
          <Button onClick={handleSaveSettings} variant="contained">{t('save')}</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}