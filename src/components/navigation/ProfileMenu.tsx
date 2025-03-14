"use client"

import type React from "react"
import { useState } from "react"
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  useTheme,
} from "@mui/material"
import { Person as PersonIcon, Settings as SettingsIcon, ExitToApp as LogoutIcon } from "@mui/icons-material"
import type { UserProfile } from "../../types"

interface ProfileMenuProps {
  user: UserProfile
  onLogout: () => void
  onProfileClick: () => void
  onSettingsClick: () => void
}

/**
 * ProfileMenu component for user profile dropdown
 *
 * @param user - User profile data
 * @param onLogout - Callback function for logout
 * @param onProfileClick - Callback function for profile click
 * @param onSettingsClick - Callback function for settings click
 */
export const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, onLogout, onProfileClick, onSettingsClick }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    onProfileClick()
    handleClose()
  }

  const handleSettingsClick = () => {
    onSettingsClick()
    handleClose()
  }

  const handleLogoutClick = () => {
    onLogout()
    handleClose()
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        aria-label="profile menu"
        sx={{ ml: 1 }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: theme.palette.primary.main,
          }}
          alt={user.name}
          src={user.avatar || undefined}
        >
          {!user.avatar && user.name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.role}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

