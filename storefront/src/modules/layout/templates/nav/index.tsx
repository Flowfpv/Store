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

export default async function Nav({ 
  params = {} 
}: { 
  params?: { countryCode?: string } 
}) {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const currentRegion = params.countryCode ? await getRegion(params.countryCode) : null
  const store = await getStore()
  const showSearch = process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED === "true"
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Shipping information bar - desktop only */}
      <ShippingBar region={currentRegion} />
      
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base"><nav className="content-container flex items-center justify-between w-full h-full px-4 small:px-8">          <div className="flex items-center gap-x-4 h-full">
            {/* Mobile menu button */}
            <div className="flex small:hidden items-center h-full">
              <SideMenu regions={regions} store={store} />
            </div>
            
            {/* Store name/logo */}
            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base font-semibold whitespace-nowrap"
                data-testid="nav-store-link"
              >
                {store?.name || "Loading ..."}
              </LocalizedClientLink>
            </div>
          </div>

          {/* Desktop navigation tabs with proper spacing */}
          <div className="flex-1 flex justify-center">
            <NavTabs />
          </div>          {/* Right side icons */}
          <div className="flex items-center gap-x-2 h-full">
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
        </nav>
      </header>
    </div>
  )
}
