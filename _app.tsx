import ThemeRegistry from "./theme"
import { LayoutProvider } from "./src/context/LayoutContext"; // Correct import path

import App from "./index"

export default function MyApp() {
  return (
    <LayoutProvider>
    <ThemeRegistry>
      <App />
    </ThemeRegistry>
    </LayoutProvider>
  )
}

