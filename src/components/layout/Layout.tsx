"use client"

import React, { useState, useCallback } from "react"
import { Box, useTheme } from "@mui/material"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useLayout } from "../../context/LayoutContext"
import type { DateRange } from "../../types"

interface LayoutProps {
  children: React.ReactNode
  title: string
}

/**
 * Main layout component for the application
 *
 * @param children - The content to render inside the layout
 * @param title - The title to display in the header
 */
export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { sidebarCollapsed } = useLayout()

  // Calculate content width based on sidebar state
  const contentWidth = sidebarCollapsed
    ? { xs: "100%", md: `calc(100% - 72px)` }
    : { xs: "100%", md: `calc(100% - 250px)` }

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  const handleSearch = useCallback((query: string) => {
    console.log("Search query:", query)
    // In a real app, this would handle search logic
  }, [])

  const handleDateRangeChange = useCallback((dateRange: DateRange) => {
    console.log("Date range changed:", dateRange)
    // In a real app, this would handle date filtering
  }, [])

  return (
    <div className="layout-container" style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh", 
      backgroundColor: "#fff",
      overflow: "hidden" // Prevent any overflow
    }}>
      {/* Fixed header at the top */}
      <Header
        title={title}
        onMenuClick={handleDrawerToggle}
        onSearch={handleSearch}
        onDateRangeChange={handleDateRangeChange}
      />
      
      {/* Content container with sidebar and main content */}
      <div style={{ 
        display: "flex", 
        width: "100%", 
        flexGrow: 1, 
        marginTop: "64px",
        backgroundColor: "#fff", // Ensure white background
        position: "relative" // For proper stacking
      }}>
        {/* Sidebar for navigation */}
        <div style={{ 
          position: "relative", 
          zIndex: 1, 
          backgroundColor: "#fff" // Ensure white background for sidebar container
        }}>
          <Sidebar open={mobileOpen} onClose={handleDrawerToggle} variant="temporary" />
          <Sidebar open={mobileOpen} onClose={handleDrawerToggle} variant="permanent" />
        </div>

        {/* Main content area */}
        <main style={{ 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column", 
          backgroundColor: "#fff",
          width: typeof contentWidth === 'object' ? '100%' : contentWidth,
          marginLeft: 0, // No margin left
          borderLeft: "none", // No border
          position: "relative", // For proper stacking
          zIndex: 0
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}
