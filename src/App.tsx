import type React from "react"
import { ThemeProvider } from "./theme/ThemeProvider"
import { LayoutProvider } from "./context/LayoutContext"
import { OrderDetail } from "./pages/OrderDetail"

/**
 * Main App component
 */
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <OrderDetail />
      </LayoutProvider>
    </ThemeProvider>
  )
}

export default App

