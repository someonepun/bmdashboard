/**
 * Utility functions for formatting data
 */

/**
 * Format currency with proper locale and currency symbol
 * @param amount - The amount to format
 * @param currency - The currency code (default: NPR)
 * @param locale - The locale (default: en-US)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency = "NPR", locale = "en-US"): string => {
  // For NPR, use Rs. format
  if (currency === "NPR") {
    return `Rs. ${amount.toLocaleString(locale)}`
  }

  // For other currencies, use standard formatting
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date to locale string
 * @param date - Date to format
 * @param locale - Locale to use for formatting
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, locale = "en-US"): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Format time remaining in countdown format
 * @param seconds - Total seconds remaining
 * @returns Formatted time string (HH:MM:SS)
 */
export const formatTimeRemaining = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${hours.toString().padStart(2, "0")}h : ${minutes
    .toString()
    .padStart(2, "0")}m : ${secs.toString().padStart(2, "0")}s`
}

