"use client"

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
} from "@mui/material"
import type { TransitionProps } from "@mui/material/transitions"
import { Close as CloseIcon, Check as CheckIcon, Clear as ClearIcon } from "@mui/icons-material"
import React from "react"

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
  orderData: {
    fullName: string
    contactInfo: string
    isGift: boolean
    isBagPurchased: boolean
    isPriceHide: boolean
    bookmarks: {
      stillReading: number
      other: number
    }
    orderNotes: string
  }
}

export function QuickInfoModal({ open, onClose, orderData }: QuickInfoModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "8px 8px 0 0",
          m: { xs: 0, sm: 2 },
          position: { xs: "fixed", sm: "static" },
          bottom: 0,
          width: "100%",
          maxHeight: { xs: "calc(100% - 32px)", sm: "80vh" },
        },
      }}
    >
      <DialogTitle
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

          <ListItem sx={{ py: 1.5, px: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                  <Typography variant="body1">IsGift</Typography>
                </Box>
              </Grid>
              <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                {orderData.isGift ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
              </Grid>
            </Grid>
          </ListItem>
          <Divider component="li" />

          <ListItem sx={{ py: 1.5, px: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                  <Typography variant="body1">IsBagPurchased</Typography>
                </Box>
              </Grid>
              <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                {orderData.isBagPurchased ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
              </Grid>
            </Grid>
          </ListItem>
          <Divider component="li" />

          <ListItem sx={{ py: 1.5, px: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                  <Typography variant="body1">IsPriceHide</Typography>
                </Box>
              </Grid>
              <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                {orderData.isPriceHide ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
              </Grid>
            </Grid>
          </ListItem>
          <Divider component="li" />

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
                    bgcolor: "#ff5722",
                    color: "white",
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
                    bgcolor: "#f5f5f5",
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

        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} color="primary">
            CLOSE
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

