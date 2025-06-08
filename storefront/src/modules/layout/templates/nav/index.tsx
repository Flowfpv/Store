import { Suspense } from "react"
import { ShoppingCart } from "lucide-react"

import { listRegions, getRegion } from "@lib/data/regions"
import { getStore } from "@lib/data/store"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavTabs from "@modules/layout/components/nav-tabs"
import NavIcons from "@modules/layout/components/nav-icons"
import ShippingBar from "@modules/layout/components/shipping-bar"
import CategoriesNav from "@modules/layout/components/categories-nav"

export default async function Nav({ 
  params = {} 
}: { 
  params?: { countryCode?: string } 
}) {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const currentRegion = params.countryCode ? await getRegion(params.countryCode) : null
  const store = await getStore()
  const showSearch = process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED === "true"
  return (    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Shipping information bar - desktop only */}
      <ShippingBar region={currentRegion} />
      
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">        <nav className="content-container w-full h-full px-4 small:px-8">
          <div className="grid grid-cols-3 items-center h-full">
            {/* Left section - Logo and mobile menu */}
            <div className="flex items-center gap-x-4 justify-start">
              {/* Mobile menu button */}
              <div className="flex small:hidden items-center h-full">
                <SideMenu regions={regions} store={store} />
              </div>
              
              {/* Store name/logo */}
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base font-semibold whitespace-nowrap"
                data-testid="nav-store-link"
              >
                {store?.name || "Loading ..."}
              </LocalizedClientLink>
            </div>

            {/* Center section - Navigation tabs */}
            <div className="flex justify-center">
              <NavTabs />
            </div>
            
            {/* Right section - Icons and cart */}
            <div className="flex items-center justify-end gap-x-2">
              <NavIcons showSearch={showSearch} regions={regions} />
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="p-2 hover:text-ui-fg-base transition-colors relative hover:bg-ui-bg-subtle rounded-md"
                    href="/cart"
                    data-testid="nav-cart-link"
                    title="Cart"
                  >
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 bg-ui-fg-base text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Categories navigation - second line */}
      <CategoriesNav />
    </div>
  )
}
