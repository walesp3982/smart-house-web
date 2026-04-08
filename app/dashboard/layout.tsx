"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Home as HomeIcon,
  Devices as DeviceIcon,
  Timeline as TimelineIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Dashboard.module.css";
import { translations } from "./tranlations";
import { DashboardProvider, useDashboard } from "./DashboardContext";

const t = (key: keyof typeof translations) => translations[key];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { userProfile, setUserProfile, snackbar, setSnackbar } = useDashboard();
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  const menuItems = [
    { text: t("menuInicio"), icon: <HomeIcon />, href: "/dashboard" },
    {
      text: t("menuDispositivos"),
      icon: <DeviceIcon />,
      href: "/dashboard/devices",
    },
    {
      text: t("menuSeguimiento"),
      icon: <TimelineIcon />,
      href: "/dashboard/tracking",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const handleSaveSettings = () => {
    setSnackbar({
      open: true,
      message: t("snackbarSettingsSaved"),
      severity: "success",
    });
    setOpenSettingsDialog(false);
  };

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
            {t("appName")}
          </Typography>
          <Typography variant="caption" className={styles.caption}>
            {t("appSubtitle")}
          </Typography>
        </Box>

        <List className={styles.menuList} sx={{ flex: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <Link
                href={item.href}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <ListItemButton
                  className={`${styles.menuItem} ${
                    isActive(item.href)
                      ? styles.menuItemActive
                      : styles.menuItemInactive
                  }`}
                >
                  <ListItemIcon className={styles.menuIcon}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>

        <Box className={styles.userFooter}>
          <Avatar className={styles.userAvatar}>
            {userProfile.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box className={styles.userInfo}>
            <Typography className={styles.userName}>
              {userProfile.name}
            </Typography>
            <Typography className={styles.userEmail}>
              {userProfile.email}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setOpenSettingsDialog(true)}
            className={styles.settingsIcon}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box>
      </Drawer>

      {/* MAIN */}
      <Box component="main" className={styles.mainContent}>
        {children}
      </Box>

      {/* DIALOG: Configuración */}
      <Dialog
        open={openSettingsDialog}
        onClose={() => setOpenSettingsDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{t("settings")}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            label={t("nameLabel")}
            value={userProfile.name}
            onChange={(e) =>
              setUserProfile((p) => ({ ...p, name: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            label={t("emailLabel")}
            type="email"
            value={userProfile.email}
            onChange={(e) =>
              setUserProfile((p) => ({ ...p, email: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettingsDialog(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSaveSettings} variant="contained">
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
