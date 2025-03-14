import type React from "react"
/**
 * Core type definitions for the application
 */

// Book item interface
export interface BookItem {
  id: number
  title: string
  author: string
  quantity: number
  cost: number
  status: OrderStatus
  image: "primary" | "default" | string
}

// Seller interface
export interface Seller {
  id: number
  name: string
  avatar: string
  books: BookItem[]
}

// Order status types
export type OrderStatus = "Confirmed" | "Cancelled" | "Pending" | "Shipped" | "Arrived at Hub" | "Processing"

// Quick info modal data interface
export interface QuickInfoData {
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

// Navigation item interface
export interface NavigationItem {
  key: string
  label: string
  icon: React.ReactNode
  path: string
  active?: boolean
}

// User profile interface
export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

// Date range interface for calendar filter
export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

