"use client"

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
    MenuItem,
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
import { useUserStore } from "@/store/user-store";
import { translations } from "./tranlations";

const t = (key: keyof typeof translations) => translations[key];

interface DashboardLayoutProps {
    children: React.ReactNode;
}

interface MenuItem {
    text: string;
    icon: React.ReactElement;
    href: string;
}
const menuItems: MenuItem[] = [
    {
        text: t("menuInicio"),
        icon: <HomeIcon />,
        href: "/dashboard"
    },
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

interface ButtonOptionProps {
    item: MenuItem;
    active: boolean;
}

export interface UserProfile {
    name: string;
    email: string;
}
function ButtonOption({ item, active }: ButtonOptionProps) {
    return (
        <ListItem disablePadding sx={{ mb: 0.5 }}>
            <Link href={item.href} style={{ width: "100%", textDecoration: "none" }}>
                <ListItemButton
                    className={`${styles.menuItem} ${active ? styles.menuItemActive : styles.menuItemInactive
                        }`}
                >
                    <ListItemIcon
                        className={`${styles.menuIcon} ${active ? styles.menuItemActive : styles.menuItemInactive}`}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
            </Link>
        </ListItem>
    );
}

function SideBarOptions({ items }: { items: MenuItem[] }) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === "/dashboard";
        }
        return pathname.startsWith(href);
    };

    return (
        <List className={styles.menuList} sx={{ flex: 1 }}>
            {items.map((item) => (
                <ButtonOption
                    key={item.href}
                    item={item}
                    active={isActive(item.href)}
                />
            ))}
        </List>
    );
}

function SideBarHeader() {
    return (
        <Box className={styles.sidebarHeader}>
            <Typography variant="h6" fontWeight={700} letterSpacing={-0.5}>
                {t("appName")}
            </Typography>
            <Typography variant="caption" className={styles.caption}>
                {t("appSubtitle")}
            </Typography>
        </Box>
    );
}

function SideBarFooter({ userProfile }: { userProfile: UserProfile | null }) {
    if (!userProfile) {
        return (
            <Box className={styles.userFooter}>
                <Box className={styles.userAvatar}>
                    <Typography className={styles.userName}>Error al obtener al usuario</Typography>
                    <Typography className={styles.userEmail}>
                        Intente de nuevo
                    </Typography>
                </Box>
            </Box>
        )
    }
    return (
        <Box className={styles.userFooter}>
            <Avatar className={styles.userAvatar}>
                {userProfile.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box className={styles.userInfo}>
                <Typography className={styles.userName}>{userProfile.name}</Typography>
                <Typography className={styles.userEmail}>
                    {userProfile.email}
                </Typography>
            </Box>
            <IconButton onClick={undefined} className={styles.settingsIcon}>
                <SettingsIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}

export function DashboardLayoutContent({ children }: DashboardLayoutProps) {
    const { user } = useUserStore();
    return (
        <Box className={styles.root}>
            {/* SIDEBAR */}
            <Drawer
                variant="permanent"
                className={styles.sidebar}
                classes={{ paper: styles.sidebarPaper }}
            >
                <SideBarHeader />

                <SideBarOptions items={menuItems} />

                <SideBarFooter userProfile={user} />
            </Drawer>

            {/* MAIN */}
            <Box component="main" className={styles.mainContent}>
                {children}
            </Box>
        </Box>
    );
}
