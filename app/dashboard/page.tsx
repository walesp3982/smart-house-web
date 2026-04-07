'use client';
import { useState, useMemo } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, TextField, Button, Avatar,
  Paper, Select, MenuItem, InputLabel, FormControl, Stack,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, Snackbar
} from '@mui/material';
import {
  Home as HomeIcon,
  Devices as DeviceIcon,
  Timeline as TimelineIcon,
  Settings as SettingsIcon,
  AddCircleOutline as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import styles from './Dashboard.module.css';

const translations = {
  appName: 'Tu casa inteligente',
  appSubtitle: 'Panel de Control',
  menuInicio: 'Inicio',
  menuDispositivos: 'Dispositivos',
  menuSeguimiento: 'Seguimiento',
  welcome: 'Bienvenido',
  enterDeviceCode: 'Ingresa el código de tu dispositivo para agregarlo.',
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
  houseMain: 'Casa Principal',
  houseMainDesc: 'Residencia principal',
  houseOffice: 'Oficina',
  houseOfficeDesc: 'Oficina central',
  houseCountry: 'Casa de Campo',
  houseCountryDesc: 'Casa de vacaciones',
};

const t = (key: keyof typeof translations) => translations[key];

interface House {
  id: number;
  name: string;
  description: string;
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

export default function Dashboard() {
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
  }>({ open: false, message: '', severity: 'success' });

  const predefinedHouses: House[] = useMemo(() => [
    { id: 1, name: t('houseMain'), description: t('houseMainDesc'), isPredefined: true },
    { id: 2, name: t('houseOffice'), description: t('houseOfficeDesc'), isPredefined: true },
    { id: 3, name: t('houseCountry'), description: t('houseCountryDesc'), isPredefined: true },
  ], []);

  const allHouses = [...predefinedHouses, ...customHouses];

  const getHouseNameById = (id: number) =>
    allHouses.find(h => h.id === id)?.name ?? 'Desconocida';

  const showSnackbar = (message: string, severity: typeof snackbar.severity) =>
    setSnackbar({ open: true, message, severity });

  // --- Handlers ---

  const handleAddDevice = () => {
    if (!deviceCode.trim()) return showSnackbar(t('snackbarErrorDeviceCode'), 'error');
    if (!selectedHouseId) return showSnackbar(t('snackbarErrorSelectHouse'), 'error');

    setDevices(prev => [...prev, {
      id: Date.now(),
      code: deviceCode.trim(),
      description: deviceDescription.trim() || undefined,
      houseId: selectedHouseId,
      addedAt: new Date().toLocaleString(),
    }]);
    setDeviceCode('');
    setDeviceDescription('');
    showSnackbar(t('snackbarDeviceAdded'), 'success');
  };

  const handleAddNewHouse = () => {
    if (!newHouseName.trim()) return showSnackbar(t('snackbarErrorHouseName'), 'error');

    const newId = Math.max(...allHouses.map(h => h.id), 0) + 1;
    const newHouse: House = {
      id: newId,
      name: newHouseName.trim(),
      description: newHouseDescription.trim() || 'Sin descripción',
    };
    setCustomHouses(prev => [...prev, newHouse]);
    setSelectedHouseId(newId);
    setNewHouseName('');
    setNewHouseDescription('');
    setOpenNewHouseDialog(false);
    showSnackbar(t('snackbarHouseAdded').replace('{name}', newHouse.name), 'success');
  };

  const handleEditDevice = (device: Device) => {
    setCurrentDevice(device);
    setEditDeviceCode(device.code);
    setEditDeviceDescription(device.description || '');
    setOpenEditDeviceDialog(true);
  };

  const handleSaveEditDevice = () => {
    if (!editDeviceCode.trim()) return showSnackbar(t('snackbarErrorEmptyCode'), 'error');

    setDevices(prev => prev.map(d =>
      d.id === currentDevice?.id
        ? { ...d, code: editDeviceCode.trim(), description: editDeviceDescription.trim() || undefined }
        : d
    ));
    setOpenEditDeviceDialog(false);
    setCurrentDevice(null);
    showSnackbar(t('snackbarDeviceUpdated'), 'success');
  };

  const handleDeleteDevice = (device: Device) => {
    setDeviceToDelete(device);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteDevice = () => {
    if (!deviceToDelete) return;
    setDevices(prev => prev.filter(d => d.id !== deviceToDelete.id));
    setDeleteConfirmOpen(false);
    setDeviceToDelete(null);
    showSnackbar(t('snackbarDeviceDeleted'), 'success');
  };

  const handleSaveSettings = () => {
    showSnackbar(t('snackbarSettingsSaved'), 'success');
    setOpenSettingsDialog(false);
  };

  // --- Menu ---

  const menuItems = [
    { text: t('menuInicio'), icon: <HomeIcon />, id: 'inicio' as const },
    { text: t('menuDispositivos'), icon: <DeviceIcon />, id: 'dispositivos' as const },
    { text: t('menuSeguimiento'), icon: <TimelineIcon />, id: 'seguimiento' as const },
  ];

  // --- Sections ---

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
                variant="outlined"
                placeholder={t('deviceCodePlaceholder')}
                value={deviceCode}
                onChange={e => setDeviceCode(e.target.value)}
              />
              <TextField
                fullWidth
                label={t('deviceDescriptionLabel')}
                variant="outlined"
                placeholder={t('deviceDescriptionPlaceholder')}
                value={deviceDescription}
                onChange={e => setDeviceDescription(e.target.value)}
              />

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>{t('selectHouseLabel')}</InputLabel>
                  <Select
                    value={selectedHouseId}
                    label={t('selectHouseLabel')}
                    onChange={e => setSelectedHouseId(e.target.value as number)}
                    renderValue={value => allHouses.find(h => h.id === value)?.name ?? ''}
                  >
                    {allHouses.map(house => (
                      <MenuItem key={house.id} value={house.id}>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>{house.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{house.description}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenNewHouseDialog(true)}
                  className={styles.newHouseButton}
                  sx={{ whiteSpace: 'nowrap', height: 56 }}
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
          <Paper elevation={0} className={styles.card}>
            <Typography variant="h4" className={styles.title}>{t('myDevices')}</Typography>

            {devices.length === 0 ? (
              <Typography color="text.secondary">{t('noDevices')}</Typography>
            ) : (
              <Stack spacing={2} mt={2}>
                {devices.map(device => (
                  <Box key={device.id} className={styles.deviceItem}>
                    <Box flex={1}>
                      <Typography className={styles.deviceCode}>{device.code}</Typography>
                      {device.description && (
                        <Typography className={styles.deviceDescription}>{device.description}</Typography>
                      )}
                      <Typography className={styles.deviceMeta}>
                        {t('houseLabel')}: {getHouseNameById(device.houseId)} &nbsp;·&nbsp; {t('addedLabel')}: {device.addedAt}
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
          <Paper elevation={0} className={styles.card}>
            <Typography variant="h4" className={styles.title}>{t('trackingTitle')}</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>{t('trackingDescription')}</Typography>
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

  // --- Render ---

  return (
    <Box className={styles.root}>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        className={styles.sidebar}
        classes={{ paper: styles.sidebarPaper }}
      >
        <Box className={styles.sidebarHeader}>
          <Typography variant="h6" fontWeight={700} letterSpacing={-0.5}>
            {t('appName')}
          </Typography>
          <Typography variant="caption" className={styles.caption}>
            {t('appSubtitle')}
          </Typography>
        </Box>

        <List className={styles.menuList} sx={{ flex: 1 }}>
          {menuItems.map(item => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => setActiveSection(item.id)}
                className={`${styles.menuItem} ${activeSection === item.id ? styles.menuItemActive : styles.menuItemInactive
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
          <IconButton onClick={() => setOpenSettingsDialog(true)} className={styles.settingsIcon}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box>
      </Drawer>

      {/* MAIN */}
      <Box component="main" className={styles.mainContent}>
        {renderContent()}
      </Box>

      {/* DIALOG: Nueva Casa */}
      <Dialog open={openNewHouseDialog} onClose={() => setOpenNewHouseDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>{t('newHouseDialogTitle')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus margin="dense" fullWidth variant="outlined"
            label={t('houseNameLabel')}
            value={newHouseName}
            onChange={e => setNewHouseName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense" fullWidth variant="outlined"
            label={t('houseDescriptionLabel')}
            value={newHouseDescription}
            onChange={e => setNewHouseDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewHouseDialog(false)}>{t('cancel')}</Button>
          <Button onClick={handleAddNewHouse} variant="contained">{t('add')}</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG: Editar Dispositivo */}
      <Dialog open={openEditDeviceDialog} onClose={() => setOpenEditDeviceDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>{t('editDevice')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus margin="dense" fullWidth variant="outlined"
            label={t('deviceCodeEditLabel')}
            value={editDeviceCode}
            onChange={e => setEditDeviceCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense" fullWidth variant="outlined"
            label={t('deviceDescriptionLabel')}
            value={editDeviceDescription}
            onChange={e => setEditDeviceDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDeviceDialog(false)}>{t('cancel')}</Button>
          <Button onClick={handleSaveEditDevice} variant="contained">{t('save')}</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG: Confirmar eliminación */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{t('deleteConfirmTitle')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('deleteConfirmMessage').replace('{device}', deviceToDelete?.code ?? '')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>{t('cancel')}</Button>
          <Button onClick={confirmDeleteDevice} color="error" variant="contained">{t('delete')}</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG: Configuración */}
      <Dialog open={openSettingsDialog} onClose={() => setOpenSettingsDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>{t('settings')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense" fullWidth variant="outlined"
            label={t('nameLabel')}
            value={userProfile.name}
            onChange={e => setUserProfile(p => ({ ...p, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense" fullWidth variant="outlined"
            label={t('emailLabel')} type="email"
            value={userProfile.email}
            onChange={e => setUserProfile(p => ({ ...p, email: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettingsDialog(false)}>{t('cancel')}</Button>
          <Button onClick={handleSaveSettings} variant="contained">{t('save')}</Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}