"use client"

import type React from "react"
import { useState } from "react"
import { IconButton, Popper, Paper, ClickAwayListener, Grow, Box, Button, Typography, useTheme } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { CalendarMonth as CalendarIcon } from "@mui/icons-material"
import type { DateRange as DateRangeType } from "../../types"
import dayjs from "dayjs"

interface CalendarFilterProps {
  onDateRangeChange?: (dateRange: DateRangeType) => void
}

/**
 * CalendarFilter component for filtering by date range
 *
 * @param onDateRangeChange - Callback function when date range changes
 */
export const CalendarFilter: React.FC<CalendarFilterProps> = ({ onDateRangeChange }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: null,
    endDate: null,
  })

  // Convert Date to Dayjs for the DatePicker
  const toDayjs = (date: Date | null): dayjs.Dayjs | undefined => {
    return date ? dayjs(date) : undefined
  }

  // Convert Dayjs to Date for our state
  const toDate = (date: dayjs.Dayjs | null): Date | null => {
    return date ? date.toDate() : null
  }

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleApply = () => {
    if (onDateRangeChange) {
      onDateRangeChange(dateRange)
    }
    handleClose()
  }

  const handleClear = () => {
    const clearedRange = { startDate: null, endDate: null }
    setDateRange(clearedRange)
    if (onDateRangeChange) {
      onDateRangeChange(clearedRange)
    }
  }

  return (
    <>
      <IconButton color="inherit" aria-label="calendar filter" onClick={handleToggle} size="medium">
        <CalendarIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: theme.zIndex.appBar + 1 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    width: { xs: 280, sm: 350 },
                    m: 1,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Filter by Date Range
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ mb: 2 }}>
                      <DatePicker
                        label="Start Date"
                        value={toDayjs(dateRange.startDate)}
                        onChange={(date) => setDateRange({ ...dateRange, startDate: toDate(date) })}
                        slotProps={{ textField: { fullWidth: true, size: "small", margin: "dense" } }}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <DatePicker
                        label="End Date"
                        value={toDayjs(dateRange.endDate)}
                        onChange={(date) => setDateRange({ ...dateRange, endDate: toDate(date) })}
                        slotProps={{ textField: { fullWidth: true, size: "small", margin: "dense" } }}
                        minDate={toDayjs(dateRange.startDate)}
                      />
                    </Box>
                  </LocalizationProvider>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Button size="small" onClick={handleClear} color="inherit">
                      Clear
                    </Button>
                    <Button size="small" variant="contained" onClick={handleApply} color="primary">
                      Apply
                    </Button>
                  </Box>
                </Paper>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  )
}

