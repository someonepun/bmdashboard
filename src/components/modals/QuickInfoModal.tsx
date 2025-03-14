"use client"

import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Paper,
  Slide,
  Grid,
  Divider,
  List,
  ListItem,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import type { TransitionProps } from "@mui/material/transitions"
import { Close as CloseIcon, Check as CheckIcon, Clear as ClearIcon } from "@mui/icons-material"
import type { QuickInfoData } from "../../types"

// Slide up transition for the modal
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface QuickInfoModalProps {
  open: boolean
  onClose: () => void
  orderData: QuickInfoData
}

/**
 * QuickInfoModal displays detailed information about an order
 *
 * @param open - Whether the modal is open
 * @param onClose - Function to close the modal
 * @param orderData - Order data to display
 */
export const QuickInfoModal: React.FC<QuickInfoModalProps> = ({ open, onClose, orderData }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Status indicator component
  const StatusIndicator = ({
    label,
    value,
  }: {
    label: string
    value: boolean
  }) => (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="body1">{label}</Typography>
        </Box>
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        {value ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
      </Grid>
    </Grid>
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      aria-labelledby="quick-info-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: isMobile ? "8px 8px 0 0" : theme.shape.borderRadius,
          m: { xs: 0, sm: 2 },
          position: { xs: "fixed", sm: "static" },
          bottom: 0,
          width: "100%",
          maxHeight: { xs: "calc(100% - 32px)", sm: "80vh" },
        },
      }}
    >
      <DialogTitle
        id="quick-info-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div">
          Quick Info
        </Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 0 }}>
        <List disablePadding>
          {/* Full Name */}
          <ListItem sx={{ py: 1.5, px: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="body2" color="text.secondary" component="div">
                Full Name
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {orderData.fullName}
              </Typography>
            </Box>
          </ListItem>
          <Divider component="li" />

          {/* Contact Info */}
          <ListItem sx={{ py: 1.5, px: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="body2" color="text.secondary" component="div">
                Contact Info
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {orderData.contactInfo}
              </Typography>
            </Box>
          </ListItem>
          <Divider component="li" />

          {/* IsGift */}
          <ListItem sx={{ py: 1.5, px: 2 }}>
            <StatusIndicator label="IsGift" value={orderData.isGift} />
          </ListItem>
          <Divider component="li" />

          {/* IsBagPurchased */}
          <ListItem sx={{ py: 1.5, px: 2 }}>
            <StatusIndicator label="IsBagPurchased" value={orderData.isBagPurchased} />
          </ListItem>
          <Divider component="li" />

          {/* IsPriceHide */}
          <ListItem sx={{ py: 1.5, px: 2 }}>
            <StatusIndicator label="IsPriceHide" value={orderData.isPriceHide} />
          </ListItem>
          <Divider component="li" />

          {/* Bookmarks */}
          <ListItem sx={{ py: 2, px: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="body2" color="text.secondary" component="div" sx={{ mb: 1.5 }}>
                Bookmarks
              </Typography>
              <Stack direction="row" spacing={2}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                    textAlign: "center",
                    borderRadius: 1,
                    flex: 1,
                  }}
                >
                  <Typography variant="h6" component="div">
                    {orderData.bookmarks.stillReading}
                  </Typography>
                  <Typography variant="caption" component="div">
                    STILL READING!
                  </Typography>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800],
                    textAlign: "center",
                    borderRadius: 1,
                    flex: 1,
                  }}
                >
                  <Typography variant="h6" component="div">
                    {orderData.bookmarks.other}
                  </Typography>
                  <Typography variant="caption" component="div">
                    पुरानो बुक मार्क नयाँ पुस्तक
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          </ListItem>
          <Divider component="li" />

          {/* Order Notes */}
          <ListItem sx={{ py: 1.5, px: 2 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="body2" color="text.secondary" component="div">
                OrderNotes
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 0.5, fontStyle: "italic" }}>
                "{orderData.orderNotes}"
              </Typography>
            </Box>
          </ListItem>
        </List>

        {/* Close button */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} color="primary">
            CLOSE
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

