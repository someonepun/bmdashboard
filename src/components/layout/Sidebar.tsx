"use client"

import type React from "react"
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  People as SellersIcon,
  Payment as PaymentIcon,
  VerifiedUser as VerificationIcon,
  AssignmentReturn as ReturnIcon,
  MoreVert as MoreVertIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"
import type { NavigationItem } from "../../types"
import { useLayout } from "../../context/LayoutContext"

interface SidebarProps {
  open: boolean
  onClose: () => void
  variant: "permanent" | "temporary"
}

/**
 * Sidebar component for navigation
 *
 * @param open - Whether the sidebar is open (for mobile)
 * @param onClose - Function to close the sidebar (for mobile)
 * @param variant - Drawer variant (permanent or temporary)
 */
export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { sidebarCollapsed, toggleSidebar } = useLayout()

  // Navigation items
  const navigationItems: NavigationItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      key: "orders",
      label: "Orders",
      icon: <OrdersIcon />,
      path: "/orders",
      active: true,
    },
    {
      key: "sellers",
      label: "All Sellers",
      icon: <SellersIcon />,
      path: "/sellers",
    },
    {
      key: "payment",
      label: "Payment Settlement",
      icon: <PaymentIcon />,
      path: "/payment",
    },
    {
      key: "verification",
      label: "Digital Item Verification",
      icon: <VerificationIcon />,
      path: "/verification",
    },
    {
      key: "return",
      label: "Return/Refund",
      icon: <ReturnIcon />,
      path: "/return",
    },
  ]

  // Calculate drawer width based on collapsed state
  const drawerWidth = sidebarCollapsed && !isMobile ? 72 : 250

  // Drawer content
  const drawerContent = (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarCollapsed && !isMobile ? "center" : "space-between",
        }}
      >
        {(!sidebarCollapsed || isMobile) && (
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            booksmandala
          </Typography>
        )}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            display: { xs: "none", md: "flex" },
            ml: sidebarCollapsed ? 0 : "auto",
          }}
        >
          {sidebarCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      {(!sidebarCollapsed || isMobile) && (
        <Box sx={{ p: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              border: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon>
              <SellersIcon />
            </ListItemIcon>
            <ListItemText primary="Seller Controls" />
          </Paper>
        </Box>
      )}
      {(!sidebarCollapsed || isMobile) && (
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Controls
          </Typography>
        </Box>
      )}
      <List>
        {navigationItems.map((item) => (
          <Tooltip
            key={item.key}
            title={sidebarCollapsed && !isMobile ? item.label : ""}
            placement="right"
            arrow
            disableHoverListener={!sidebarCollapsed || isMobile}
          >
            <ListItemButton
              selected={item.active}
              sx={{
                minHeight: 48,
                px: sidebarCollapsed && !isMobile ? 2.5 : 3,
                justifyContent: sidebarCollapsed && !isMobile ? "center" : "flex-start",
                bgcolor: item.active ? theme.palette.primary.light + "20" : "transparent",
                "&:hover": {
                  bgcolor: item.active ? theme.palette.primary.light + "30" : undefined,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarCollapsed && !isMobile ? "auto" : 3,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {(!sidebarCollapsed || isMobile) && <ListItemText primary={item.label} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarCollapsed && !isMobile ? "center" : "flex-start",
        }}
      >
        <Avatar sx={{ mr: sidebarCollapsed && !isMobile ? 0 : 2 }}>P</Avatar>
        {(!sidebarCollapsed || isMobile) && (
          <>
            <Typography>Person Name</Typography>
            <IconButton sx={{ ml: "auto" }}>
              <MoreVertIcon />
            </IconButton>
          </>
        )}
      </Box>
    </>
  )

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        position: "relative",
        backgroundColor: "#fff", // Ensure white background
      }}
      aria-label="navigation sidebar"
    >
      {/* Mobile drawer */}
      {variant === "temporary" && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              paddingTop: "64px", // Height of the AppBar
              backgroundColor: "#fff", // Ensure white background
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop drawer */}
      {variant === "permanent" && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflowX: "hidden",
              borderRight: `1px solid ${theme.palette.divider}`,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              // Adjust for fixed header
              height: "100%",
              paddingTop: "64px", // Height of the AppBar
              backgroundColor: "#fff", // Ensure white background
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  )
}
