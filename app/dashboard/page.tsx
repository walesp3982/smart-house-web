'use client';
import React, { useState, useMemo } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, TextField, Button, Avatar,
  Paper, Select, MenuItem, InputLabel, FormControl, Stack,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, Snackbar
} from '@mui/material';
import {
  Home as HomeIcon, Devices as DeviceIcon,
  Timeline as TimelineIcon, Settings as SettingsIcon, AddCircleOutline as AddIcon,
  Edit as EditIcon, Delete as DeleteIcon
} from '@mui/icons-material';
import styles from './Dashboard.module.css';

const drawerWidth = 260;

// Traducciones (solo español fijo)
const t = (key: keyof typeof translations) => translations[key];

const translations = {
  appName: 'Tu casa inteligente✨',
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
  nameLabel: 'Nombre',
  emailLabel: 'Email',
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
  // Casas predefinidas
  houseMain: 'Casa Principal',
  houseMainDesc: 'Residencia principal',
  houseOffice: 'Oficina',
  houseOfficeDesc: 'Oficina central',
  houseCountry: 'Casa de Campo',
  houseCountryDesc: 'Casa de vacaciones',
};

// Interfaces
interface House {
  id: number;
  name: string;
  description: string;
  icon: string;
  isPredefined?: boolean;
}

interface Device {
  id: number;
  code: string;
  description?: string;
  houseId: number;
  addedAt: string;
}

interface UserProfile {
  name: string;
  email: string;
}

export default function DashboardPremium() {
  const [activeSection, setActiveSection] = useState<'inicio' | 'dispositivos' | 'seguimiento'>('inicio');

  const [deviceCode, setDeviceCode] = useState('');
  const [deviceDescription, setDeviceDescription] = useState('');
  const [selectedHouseId, setSelectedHouseId] = useState<number | ''>('');
  const [customHouses, setCustomHouses] = useState<House[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Admin',
    email: 'admin@smarthome.com',
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

  // Casas predefinidas (estáticas)
  const predefinedHouses: House[] = useMemo(() => [
    { id: 1, name: t('houseMain'), description: t('houseMainDesc'), icon: '🏠', isPredefined: true },
    { id: 2, name: t('houseOffice'), description: t('houseOfficeDesc'), icon: '🏢', isPredefined: true },
    { id: 3, name: t('houseCountry'), description: t('houseCountryDesc'), icon: '🏡', isPredefined: true },
  ], []);

  const allHouses = [...predefinedHouses, ...customHouses];

  const getHouseNameById = (id: number) => {
    const house = allHouses.find(h => h.id === id);
    return house ? house.name : 'Desconocida';
  };

  const handleAddDevice = () => {
    if (!deviceCode.trim()) {
      setSnackbar({ open: true, message: t('snackbarErrorDeviceCode'), severity: 'error' });
      return;
    }
    if (!selectedHouseId) {
      setSnackbar({ open: true, message: t('snackbarErrorSelectHouse'), severity: 'error' });
      return;
    }

    const newDevice: Device = {
      id: Date.now(),
      code: deviceCode,
      description: deviceDescription.trim() || undefined,
      houseId: selectedHouseId,
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
    const newId = Math.max(...allHouses.map(h => h.id), 0) + 1;
    const newHouse: House = {
      id: newId,
      name: newHouseName,
      description: newHouseDescription.trim() || 'Sin descripción',
      icon: '🏠',
    };
    setCustomHouses([...customHouses, newHouse]);
    setSelectedHouseId(newId);
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

  const menuItems = [
    { text: t('menuInicio'), icon: <HomeIcon />, id: 'inicio' as const },
    { text: t('menuDispositivos'), icon: <DeviceIcon />, id: 'dispositivos' as const },
    { text: t('menuSeguimiento'), icon: <TimelineIcon />, id: 'seguimiento' as const },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <Paper elevation={0} className={styles.card}>
            <Typography variant="h3" className={styles.title}>{t('welcome')}</Typography>
            <Typography variant="body1" className={styles.subtitle}>{t('enterDeviceCode')}</Typography>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label={t('deviceCodeLabel')}
                variant="filled"
                placeholder={t('deviceCodePlaceholder')}
                value={deviceCode}
                onChange={(e) => setDeviceCode(e.target.value)}
                className={styles.textField}
              />
              <TextField
                fullWidth
                label={t('deviceDescriptionLabel')}
                variant="filled"
                placeholder={t('deviceDescriptionPlaceholder')}
                value={deviceDescription}
                onChange={(e) => setDeviceDescription(e.target.value)}
                className={styles.textField}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl fullWidth variant="filled" className={styles.formControl}>
                  <InputLabel>{t('selectHouseLabel')}</InputLabel>
                  <Select
                    value={selectedHouseId}
                    onChange={(e) => setSelectedHouseId(e.target.value as number)}
                    label={t('selectHouseLabel')}
                    renderValue={(value) => {
                      const house = allHouses.find(h => h.id === value);
                      return house ? `${house.icon} ${house.name}` : '';
                    }}
                  >
                    {allHouses.map((house) => (
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
                  className={styles.newHouseButton}
                >
                  {t('newHouseButton')}
                </Button>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleAddDevice}
                className={styles.addDeviceButton}
              >
                {t('addDeviceButton')}
              </Button>
            </Stack>
          </Paper>
        );

      case 'dispositivos':
        return (
          <Paper elevation={0} className={`${styles.card} ${styles.cardLarge}`}>
            <Typography variant="h4" className={styles.title}>{t('myDevices')}</Typography>
            {devices.length === 0 ? (
              <Typography color="text.secondary">{t('noDevices')}</Typography>
            ) : (
              <Stack spacing={2}>
                {devices.map((device) => (
                  <Box key={device.id} className={styles.deviceItem}>
                    <Box className={styles.deviceInfo}>
                      <Typography className={styles.deviceCode}>{device.code}</Typography>
                      {device.description && (
                        <Typography className={styles.deviceDescription}>{device.description}</Typography>
                      )}
                      <Typography className={styles.deviceMeta}>
                        {t('houseLabel')}: {getHouseNameById(device.houseId)} | {t('addedLabel')}: {device.addedAt}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" onClick={() => handleEditDevice(device)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteDevice(device)}>
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
          <Paper elevation={0} className={`${styles.card} ${styles.cardLarge}`}>
            <Typography variant="h4" className={styles.title}>{t('trackingTitle')}</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>{t('trackingDescription')}</Typography>
            <Box className={styles.trackingPlaceholder}>
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
    <Box className={styles.root}>
      <Drawer
        variant="permanent"
        className={styles.sidebar}
        classes={{ paper: styles.sidebarPaper }}
      >
        <Box className={styles.sidebarHeader}>
          <Typography variant="h6" fontWeight="bold">{t('appName')}</Typography>
          <Typography variant="caption" className={styles.caption}>{t('appSubtitle')}</Typography>
        </Box>

        <List className={styles.menuList}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => setActiveSection(item.id)}
                className={`${styles.menuItem} ${
                  activeSection === item.id ? styles.menuItemActive : styles.menuItemInactive
                }`}
              >
                <ListItemIcon className={styles.menuIcon}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box className={styles.userFooter}>
          <Avatar className={styles.userAvatar}>
            {userProfile.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box className={styles.userInfo}>
            <Typography className={styles.userName}>{userProfile.name}</Typography>
            <Typography className={styles.userEmail}>{userProfile.email}</Typography>
          </Box>
          <IconButton onClick={handleOpenSettings} sx={{ color: 'white' }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Drawer>

      <Box component="main" className={styles.mainContent}>
        {renderContent()}
      </Box>

      {/* Diálogos */}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettingsDialog(false)}>{t('cancel')}</Button>
          <Button onClick={handleSaveSettings} variant="contained">{t('save')}</Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
}