import type { Seller, OrderStatus, QuickInfoData } from "../types"

/**
 * Generate mock data for the application
 * @returns Array of sellers with their books
 */
export const generateMockData = (): Seller[] => {
  const statuses: OrderStatus[] = ["Confirmed", "Cancelled", "Pending", "Shipped", "Arrived at Hub", "Processing"]

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

/**
 * Get mock order data for the quick info modal
 * @returns Mock order data
 */
export const getMockOrderData = (): QuickInfoData => {
  return {
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
}

