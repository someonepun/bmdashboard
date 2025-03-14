"use client"

import type React from "react"
import { Typography, Paper, Grid, Box, Button, useTheme, useMediaQuery } from "@mui/material"
import { ContentCopy as CopyIcon, Refresh as RefreshIcon } from "@mui/icons-material"
import { formatCurrency, formatTimeRemaining } from "../../utils/formatters"

interface OrderSummaryProps {
  orderId: string
  description?: string
  totalAmount: number
  status: string
  couponCode?: string
  timeRemaining: number
  onCopyQR: () => void
  onRegenerate: () => void
}

/**
 * OrderSummary component displays key information about an order
 *
 * @param orderId - The order ID
 * @param description - Optional description
 * @param totalAmount - Total order amount
 * @param status - Current order status
 * @param couponCode - Optional coupon code
 * @param timeRemaining - Time remaining in seconds
 * @param onCopyQR - Function to handle copy QR button click
 * @param onRegenerate - Function to handle regenerate button click
 */
export const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderId,
  description,
  totalAmount,
  status,
  couponCode,
  timeRemaining,
  onCopyQR,
  onRegenerate,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 1,
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
          }}
        >
          Order Summary{" "}
          <Typography component="span" color="primary" fontWeight="bold">
            #{orderId}
          </Typography>
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>
        )}
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Typography variant="h6">{formatCurrency(totalAmount)}</Typography>
            <Typography variant="body2">Total (Paid Esewa)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">{status}</Typography>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">{couponCode || "No Coupon"}</Typography>
            <Typography variant="body2" color="text.secondary">
              Coupon Code
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="body2">
          GENERATED PAY BY URL •{" "}
          <Typography component="span" color="error" fontWeight="medium">
            {formatTimeRemaining(timeRemaining)}
          </Typography>
        </Typography>
        <Box>
          <Button startIcon={<CopyIcon />} size="small" sx={{ mr: 1 }} onClick={onCopyQR}>
            COPY QR
          </Button>
          <Button startIcon={<RefreshIcon />} size="small" onClick={onRegenerate}>
            REGENERATE
          </Button>
        </Box>
      </Box>
    </>
  )
}

