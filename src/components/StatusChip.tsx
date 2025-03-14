"use client"

import type React from "react"
import { useMemo } from "react"
import { Chip, useTheme } from "@mui/material"
import type { OrderStatus } from "../types"

interface StatusChipProps {
  status: OrderStatus
  size?: "small" | "medium"
}

/**
 * StatusChip component displays a colored chip based on the order status
 *
 * @param status - The order status to display
 * @param size - The size of the chip (small or medium)
 */
export const StatusChip: React.FC<StatusChipProps> = ({ status, size = "small" }) => {
  const theme = useTheme()

  // Memoize the color configuration to prevent recalculation on re-renders
  const { bgcolor, color } = useMemo(() => {
    switch (status) {
      case "Cancelled":
        return {
          bgcolor: theme.palette.error.light,
          color: theme.palette.error.dark,
        }
      case "Pending":
        return {
          bgcolor: theme.palette.warning.light,
          color: theme.palette.warning.dark,
        }
      case "Processing":
        return {
          bgcolor: theme.palette.info.light,
          color: theme.palette.info.dark,
        }
      case "Shipped":
        return {
          bgcolor: theme.palette.success.light,
          color: theme.palette.success.dark,
        }
      case "Arrived at Hub":
        return {
          bgcolor: theme.palette.success.light,
          color: theme.palette.success.dark,
        }
      case "Confirmed":
      default:
        return {
          bgcolor: theme.palette.success.light,
          color: theme.palette.success.dark,
        }
    }
  }, [status, theme.palette])

  return (
    <Chip
      label={status}
      size={size}
      sx={{
        bgcolor,
        color,
        fontWeight: 500,
      }}
    />
  )
}

