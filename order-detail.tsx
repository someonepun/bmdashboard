"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Chip,
  Grid,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  TablePagination,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  People as SellersIcon,
  Payment as PaymentIcon,
  VerifiedUser as VerificationIcon,
  AssignmentReturn as ReturnIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  Menu as MenuIcon,
  Print as PrintIcon,
} from "@mui/icons-material"

// Missing PrintIcon import
import { QuickInfoModal } from "./components/quick-info-modal"

// Types for our data
interface BookItem {
  id: number
  title: string
  author: string
  quantity: number
  cost: number
  status: "Confirmed" | "Cancelled" | "Pending" | "Shipped" | "Arrived at Hub" | "Processing"
  image: string
}

interface Seller {
  id: number
  name: string
  avatar: string
  books: BookItem[]
}

// Mock data generator
const generateMockData = (): Seller[] => {
  const statuses: BookItem["status"][] = [
    "Confirmed",
    "Cancelled",
    "Pending",
    "Shipped",
    "Arrived at Hub",
    "Processing",
  ]
  const bookTitles = [
    "The Great Adventure",
    "Hidden Secrets",
    "Mountain Echoes",
    "Urban Tales",
    "Distant Horizons",
    "Whispers in the Wind",
    "Forgotten Realms",
    "Eternal Sunshine",
    "Midnight Chronicles",
    "Ocean Depths",
  ]
  const authors = [
    "John Smith",
    "Emily Johnson",
    "Michael Brown",
    "Sarah Davis",
    "David Wilson",
    "Lisa Anderson",
    "Robert Taylor",
    "Jennifer Thomas",
    "William Martin",
    "Jessica White",
  ]

  // Generate sellers
  const sellers: Seller[] = [
    {
      id: 1,
      name: "Booksmandala",
      avatar: "B",
      books: [],
    },
    {
      id: 2,
      name: "HamroBooks",
      avatar: "H",
      books: [],
    },
  ]

  // Generate 70 books for first seller
  for (let i = 1; i <= 70; i++) {
    const randomTitleIndex = Math.floor(Math.random() * bookTitles.length)
    const randomAuthorIndex = Math.floor(Math.random() * authors.length)
    const randomStatusIndex = Math.floor(Math.random() * statuses.length)
    const randomQuantity = Math.floor(Math.random() * 5) + 1
    const randomCost = Math.floor(Math.random() * 500) + 100

    sellers[0].books.push({
      id: i,
      title: bookTitles[randomTitleIndex],
      author: authors[randomAuthorIndex],
      quantity: randomQuantity,
      cost: randomCost,
      status: statuses[randomStatusIndex],
      image: randomTitleIndex % 3 === 0 ? "primary" : "default",
    })
  }

  // Generate 30 books for second seller
  for (let i = 71; i <= 100; i++) {
    const randomTitleIndex = Math.floor(Math.random() * bookTitles.length)
    const randomAuthorIndex = Math.floor(Math.random() * authors.length)
    const randomStatusIndex = Math.floor(Math.random() * statuses.length)
    const randomQuantity = Math.floor(Math.random() * 5) + 1
    const randomCost = Math.floor(Math.random() * 500) + 100

    sellers[1].books.push({
      id: i,
      title: bookTitles[randomTitleIndex],
      author: authors[randomAuthorIndex],
      quantity: randomQuantity,
      cost: randomCost,
      status: statuses[randomStatusIndex],
      image: randomTitleIndex % 3 === 0 ? "primary" : "default",
    })
  }

  return sellers
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  }
}

// Status chip component
const StatusChip = ({ status }: { status: BookItem["status"] }) => {
  let color = "#e8f5e9"
  let textColor = "#2e7d32"

  switch (status) {
    case "Cancelled":
      color = "#ffebee"
      textColor = "#c62828"
      break
    case "Pending":
      color = "#fff8e1"
      textColor = "#f57f17"
      break
    case "Processing":
      color = "#e3f2fd"
      textColor = "#1565c0"
      break
    case "Shipped":
      color = "#e8f5e9"
      textColor = "#2e7d32"
      break
    case "Arrived at Hub":
      color = "#e0f2f1"
      textColor = "#00695c"
      break
    default:
      break
  }

  return <Chip label={status} size="small" sx={{ bgcolor: color, color: textColor }} />
}

export default function OrderDetail() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  const [mobileOpen, setMobileOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [page1, setPage1] = useState(0)
  const [page2, setPage2] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sellers, setSellers] = useState<Seller[]>([])
  const [quickInfoOpen, setQuickInfoOpen] = useState(false)
  const mockOrderData = {
    fullName: "Niraj Pun",
    contactInfo: "9848260876",
    isGift: false,
    isBagPurchased: false,
    isPriceHide: true,
    bookmarks: {
      stillReading: 3,
      other: 1,
    },
    orderNotes: 'Please write "k chha khabar" in sticky notes and deliver it',
  }

  useEffect(() => {
    // Generate mock data when component mounts
    setSellers(generateMockData())
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
    sellerIndex: number,
  ) => {
    if (sellerIndex === 0) {
      setPage1(newPage)
    } else {
      setPage2(newPage)
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    sellerIndex: number,
  ) => {
    const newRowsPerPage = Number.parseInt(event.target.value, 10)
    setRowsPerPage(newRowsPerPage)

    if (sellerIndex === 0) {
      setPage1(0)
    } else {
      setPage2(0)
    }
  }

  // Drawer content
  const drawer = (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          booksmandala
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 1,
            border: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ListItemIcon>
            <SellersIcon />
          </ListItemIcon>
          <ListItemText primary="Seller Controls" />
        </Paper>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Controls
        </Typography>
      </Box>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton selected sx={{ bgcolor: "#e3f2fd" }}>
          <ListItemIcon>
            <OrdersIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SellersIcon />
          </ListItemIcon>
          <ListItemText primary="All Sellers" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Payment Settlement" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <VerificationIcon />
          </ListItemIcon>
          <ListItemText primary="Digital Item Verification" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ReturnIcon />
          </ListItemIcon>
          <ListItemText primary="Return/Refund" />
        </ListItemButton>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <Avatar sx={{ mr: 2 }}>P</Avatar>
        <Typography>Person Name</Typography>
        <IconButton sx={{ ml: "auto" }}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </>
  )

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar for mobile */}
      <Box component="nav" sx={{ width: { md: 250 }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 0, width: { xs: "100%", md: `calc(100% - 250px)` } }}
      >
        <Box sx={{ bgcolor: "white", p: 2, pl: 3, display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>Dashboard &gt; Sellers</Typography>
        </Box>
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Typography variant="h5" sx={{ mb: 1, fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" } }}>
            Order Summary{" "}
            <Typography component="span" color="primary" fontWeight="bold">
              #ORD4567
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Additional description if required
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, bgcolor: "#1976d2", color: "white" }}>
                <Typography variant="h6">NPR 2,758</Typography>
                <Typography variant="body2">Total (Paid Esewa)</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Waiting at Hub</Typography>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">No Coupon</Typography>
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
              <Typography component="span" color="error">
                24h : 00m : 00s
              </Typography>
            </Typography>
            <Box>
              <Button startIcon={<CopyIcon />} size="small" sx={{ mr: 1 }}>
                COPY QR
              </Button>
              <Button startIcon={<RefreshIcon />} size="small">
                REGENERATE
              </Button>
            </Box>
          </Box>

          <Stepper sx={{ mb: 4 }} alternativeLabel={!isSmall} orientation={isSmall ? "vertical" : "horizontal"}>
            <Step completed>
              <StepLabel>Conformation</StepLabel>
            </Step>
            <Step active>
              <StepLabel>Waiting at Hub</StepLabel>
            </Step>
            <Step>
              <StepLabel>Shipped</StepLabel>
            </Step>
            <Step>
              <StepLabel>Delivered</StepLabel>
            </Step>
          </Stepper>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="order tabs"
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
              >
                <Tab label="INVOICE ITEM" {...a11yProps(0)} />
                <Tab label="ORDER DETAILS" {...a11yProps(1)} />
                <Tab label="SHIPPING" {...a11yProps(2)} />
                <Tab label="INVOICES" {...a11yProps(3)} />
                <Tab label="REFUNDS" {...a11yProps(4)} />
                <Tab label="PAYMENTS" {...a11yProps(5)} />
                <Tab label="LOGS" {...a11yProps(6)} />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              {sellers.map((seller, sellerIndex) => (
                <Box key={seller.id} sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: "#f5f5f5", color: "text.secondary" }}>{seller.avatar}</Avatar>
                    <Typography variant="h6">{seller.name}</Typography>
                  </Box>
                  <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell>Book Info</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Cost</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {seller.books
                          .slice(
                            (sellerIndex === 0 ? page1 : page2) * rowsPerPage,
                            (sellerIndex === 0 ? page1 : page2) * rowsPerPage + rowsPerPage,
                          )
                          .map((book) => (
                            <TableRow key={book.id}>
                              <TableCell padding="checkbox">
                                <Checkbox />
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <Avatar
                                    variant="square"
                                    sx={{
                                      mr: 2,
                                      bgcolor: book.image === "primary" ? "#2196f3" : "#f5f5f5",
                                      color: book.image === "primary" ? "white" : "text.secondary",
                                    }}
                                  >
                                    {book.title.charAt(0)}
                                  </Avatar>
                                  <Box>
                                    <Typography>{book.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      by {book.author}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>{book.quantity}</TableCell>
                              <TableCell>Rs. {book.cost}</TableCell>
                              <TableCell>
                                <StatusChip status={book.status} />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      count={seller.books.length}
                      page={sellerIndex === 0 ? page1 : page2}
                      onPageChange={(event, page) => handleChangePage(event, page, sellerIndex)}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={(event) => handleChangeRowsPerPage(event, sellerIndex)}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                  </TableContainer>
                </Box>
              ))}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Typography>Order details content</Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Typography>Shipping content</Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <Typography>Invoices content</Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <Typography>Refunds content</Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
              <Typography>Payments content</Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={6}>
              <Typography>Logs content</Typography>
            </TabPanel>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: { xs: 2, md: 3 },
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Button variant="outlined" size="small" fullWidth={isMobile} onClick={() => setQuickInfoOpen(true)}>
            QUICK VIEW
          </Button>
          <Button variant="outlined" size="small" startIcon={<PrintIcon />} fullWidth={isMobile}>
            PRINT LABEL
          </Button>
          <Box sx={{ flexGrow: { xs: 0, sm: 1 } }} />
          <Button variant="contained" color="primary" size="small" fullWidth={isMobile}>
            MARK READY TO SHIP
          </Button>
        </Box>
        <QuickInfoModal open={quickInfoOpen} onClose={() => setQuickInfoOpen(false)} orderData={mockOrderData} />
      </Box>
    </Box>
  )
}

