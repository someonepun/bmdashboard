"use client"

import type React from "react"
import { useState } from "react"
import { Box, Tab, Tabs, Typography, useTheme, useMediaQuery } from "@mui/material"
import type { Seller } from "../../types"
import { BookTable } from "./BookTable"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

/**
 * TabPanel component for displaying tab content
 */
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>{children}</Box>}
    </div>
  )
}

/**
 * Helper function for accessibility props
 */
const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  }
}

interface OrderTabsProps {
  sellers: Seller[]
}

/**
 * OrderTabs component displays tabs for different order sections
 *
 * @param sellers - Array of sellers with their books
 */
export const OrderTabs: React.FC<OrderTabsProps> = ({ sellers }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [tabValue, setTabValue] = useState(0)

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Tab labels
  const tabLabels = ["INVOICE ITEM", "ORDER DETAILS", "SHIPPING", "INVOICES", "REFUNDS", "PAYMENTS", "LOGS"]

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="order tabs"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
        >
          {tabLabels.map((label, index) => (
            <Tab key={label} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {/* Invoice Item Tab */}
      <TabPanel value={tabValue} index={0}>
        {sellers.map((seller, index) => (
          <BookTable key={seller.id} seller={seller} sellerIndex={index} />
        ))}
      </TabPanel>

      {/* Other Tabs */}
      {tabLabels.slice(1).map((label, index) => (
        <TabPanel key={label} value={tabValue} index={index + 1}>
          <Typography>{label.charAt(0) + label.slice(1).toLowerCase()} content</Typography>
        </TabPanel>
      ))}
    </Box>
  )
}

