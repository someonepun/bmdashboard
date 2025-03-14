"use client"

import type React from "react"
import { Typography, IconButton, useTheme, Toolbar, AppBar, Tooltip, Stack } from "@mui/material"
import { Menu as MenuIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from "@mui/icons-material"
import { useThemeContext } from "../../theme/ThemeProvider"
import { SearchBar } from "../navigation/SearchBar"
import { CalendarFilter } from "../navigation/CalendarFilter"
import { ProfileMenu } from "../navigation/ProfileMenu"
import type { DateRange, UserProfile } from "../../types"

interface HeaderProps {
  title: string
  onMenuClick: () => void
  onSearch?: (query: string) => void
  onDateRangeChange?: (dateRange: DateRange) => void
}

/**
 * Header component for the application
 *
 * @param title - The title to display in the header
 * @param onMenuClick - Function to handle menu button click
 * @param onSearch - Function to handle search
 * @param onDateRangeChange - Function to handle date range change
 */
export const Header: React.FC<HeaderProps> = ({ title, onMenuClick, onSearch, onDateRangeChange }) => {
  const theme = useTheme()
  const { mode, toggleColorMode } = useThemeContext()

  // Mock user data - in a real app, this would come from authentication
  const mockUser: UserProfile = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    role: "Administrator",
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    // In a real app, this would handle logout logic
  }

  const handleProfileClick = () => {
    console.log("Profile clicked")
    // In a real app, this would navigate to profile page
  }

  const handleSettingsClick = () => {
    console.log("Settings clicked")
    // In a real app, this would navigate to settings page
  }

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* Right side navigation items */}
        <Stack direction="row" spacing={1} alignItems="center">
          <SearchBar placeholder="Search orders..." onSearch={onSearch} />

          <CalendarFilter onDateRangeChange={onDateRangeChange} />

          <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          <ProfileMenu
            user={mockUser}
            onLogout={handleLogout}
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

