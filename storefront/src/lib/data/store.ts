import { cache } from "react"

export const getStore = cache(async function () {
  try {    const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/custom`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
      },
      next: { tags: ["store"] }
    })
    
    if (!response.ok) {
      console.error("Failed to fetch store:", response.statusText)
      return null
    }
    
    const data = await response.json()
    return data.store
  } catch (error) {
    console.error("Error fetching store:", error)
    return null
  }
})
