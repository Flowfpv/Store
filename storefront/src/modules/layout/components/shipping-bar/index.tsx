"use client"

import { Truck, X } from "lucide-react"
import { useState } from "react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type ShippingBarProps = {
  region?: HttpTypes.StoreRegion | null
}

export default function ShippingBar({ region }: ShippingBarProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  // Get the formatted currency amount (75 in the region's currency)
  const freeShippingThreshold = region?.currency_code ? 
    convertToLocale({ 
      amount: 75, 
      currency_code: region.currency_code 
    }) : "$75"
  return (
    <div className="bg-ui-bg-interactive text-white text-sm py-2 px-4 small:px-8 hidden small:block">
      <div className="content-container flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-x-2">
          <Truck size={16} />
          <span className="font-medium">
            Free shipping on orders over {freeShippingThreshold} • Fast delivery worldwide
          </span>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-white/70 hover:text-white transition-colors"
          aria-label="Close shipping announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
