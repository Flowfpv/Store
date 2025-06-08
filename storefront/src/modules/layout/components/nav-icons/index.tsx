"use client"

import { Search, User, ShoppingCart } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountryFlagSelect from "../country-flag-select"
import { HttpTypes } from "@medusajs/types"

interface NavIconsProps {
  showSearch?: boolean
  regions?: HttpTypes.StoreRegion[] | null
}

export default function NavIcons({ showSearch = false, regions }: NavIconsProps) {
  return (
    <div className="flex items-center gap-x-4 h-full">
      {/* Search icon - always shown on desktop */}
      <LocalizedClientLink
        className="hidden small:flex p-2 hover:text-ui-fg-base transition-colors hover:bg-ui-bg-subtle rounded-md"
        href="/search"
        scroll={false}
        data-testid="nav-search-link"
        title="Search"
      >
        <Search size={20} />
      </LocalizedClientLink>
      
      {/* Country flag selector - desktop only */}
      {regions && regions.length > 0 && (
        <div className="hidden small:block relative">
          <CountryFlagSelect regions={regions} />
        </div>
      )}
      
      <LocalizedClientLink
        className="p-2 hover:text-ui-fg-base transition-colors hover:bg-ui-bg-subtle rounded-md"
        href="/account"
        data-testid="nav-account-link"
        title="Account"
      >
        <User size={20} />
      </LocalizedClientLink>
    </div>
  )
}
