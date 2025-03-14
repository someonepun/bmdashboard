"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Box, useTheme } from "@mui/material"
import { Layout } from "../components/layout/Layout"
import { OrderSummary } from "../components/orders/OrderSummary"
import { OrderProgress } from "../components/orders/OrderProgress"
import { OrderTabs } from "../components/orders/OrderTabs"
import { ActionButtons } from "../components/orders/ActionButtons"
import { QuickInfoModal } from "../components/modals/QuickInfoModal"
import { generateMockData, getMockOrderData } from "../services/mockDataService"
import type { Seller, QuickInfoData, DateRange } from "../types"

/**
 * OrderDetail page component
 */
export const OrderDetail: React.FC = () => {
  const theme = useTheme()

  // State
  const [sellers, setSellers] = useState<Seller[]>([])
  const [quickInfoOpen, setQuickInfoOpen] = useState(false)
  const [orderData, setOrderData] = useState<QuickInfoData | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(86400) // 24 hours in seconds
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  })

  // Load mock data
  useEffect(() => {
    setSellers(generateMockData())
    setOrderData(getMockOrderData())
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Event handlers
  const handleQuickView = useCallback(() => {
    setQuickInfoOpen(true)
  }, [])

  const handleCloseQuickInfo = useCallback(() => {
    setQuickInfoOpen(false)
  }, [])

  const handleCopyQR = useCallback(() => {
    // In a real app, this would copy the QR code
    console.log("Copy QR clicked")
  }, [])

  const handleRegenerate = useCallback(() => {
    // In a real app, this would regenerate the payment URL
    console.log("Regenerate clicked")
    setTimeRemaining(86400) // Reset timer
  }, [])

  const handlePrintLabel = useCallback(() => {
    // In a real app, this would print the label
    console.log("Print label clicked")
  }, [])

  const handleMarkReady = useCallback(() => {
    // In a real app, this would mark the order as ready to ship
    console.log("Mark ready clicked")
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    console.log("Searching for:", query)
    // In a real app, this would filter the data based on the search query
  }, [])

  const handleDateRangeChange = useCallback((newDateRange: DateRange) => {
    setDateRange(newDateRange)
    console.log("Date range changed:", newDateRange)
    // In a real app, this would filter the data based on the date range
  }, [])

  // Order progress steps
  const orderSteps = ["Confirmation", "Waiting at Hub", "Shipped", "Delivered"]

  return (
    <Layout title="Dashboard > Sellers">
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <OrderSummary
            orderId="ORD4567"
            description="Additional description if required"
            totalAmount={2758}
            status="Waiting at Hub"
            timeRemaining={timeRemaining}
            onCopyQR={handleCopyQR}
            onRegenerate={handleRegenerate}
          />

          <OrderProgress steps={orderSteps} activeStep={1} />

          <OrderTabs sellers={sellers} />
        </Box>

        <Box sx={{ mt: "auto" }}>
          <ActionButtons onQuickView={handleQuickView} onPrintLabel={handlePrintLabel} onMarkReady={handleMarkReady} />
        </Box>

        {orderData && <QuickInfoModal open={quickInfoOpen} onClose={handleCloseQuickInfo} orderData={orderData} />}
      </Box>
    </Layout>
  )
}
