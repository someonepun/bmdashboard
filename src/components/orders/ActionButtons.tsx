"use client"

import type React from "react"
import { Box, Button, useTheme, useMediaQuery } from "@mui/material"
import { Print as PrintIcon } from "@mui/icons-material"

interface ActionButtonsProps {
  onQuickView: () => void
  onPrintLabel: () => void
  onMarkReady: () => void
}

/**
 * ActionButtons component displays action buttons for the order
 *
 * @param onQuickView - Function to handle quick view button click
 * @param onPrintLabel - Function to handle print label button click
 * @param onMarkReady - Function to handle mark ready button click
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({ onQuickView, onPrintLabel, onMarkReady }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      sx={{
        display: "flex",
        p: { xs: 2, md: 3 },
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Button variant="outlined" size="small" fullWidth={isMobile} onClick={onQuickView}>
        QUICK VIEW
      </Button>
      <Button variant="outlined" size="small" startIcon={<PrintIcon />} fullWidth={isMobile} onClick={onPrintLabel}>
        PRINT LABEL
      </Button>
      <Box sx={{ flexGrow: { xs: 0, sm: 1 } }} />
      <Button variant="contained" color="primary" size="small" fullWidth={isMobile} onClick={onMarkReady}>
        MARK READY TO SHIP
      </Button>
    </Box>
  )
}

