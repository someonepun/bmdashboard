"use client"

import type React from "react"
import { Stepper, Step, StepLabel, useTheme, useMediaQuery } from "@mui/material"

interface OrderProgressProps {
  steps: string[]
  activeStep: number
}

/**
 * OrderProgress component displays the current status of an order
 *
 * @param steps - Array of step labels
 * @param activeStep - Current active step (0-based index)
 */
export const OrderProgress: React.FC<OrderProgressProps> = ({ steps, activeStep }) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Stepper
      sx={{ mb: 4 }}
      alternativeLabel={!isSmall}
      orientation={isSmall ? "vertical" : "horizontal"}
      activeStep={activeStep}
    >
      {steps.map((label, index) => (
        <Step key={label} completed={index < activeStep}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

