"use client"

import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NavTabs() {
  const pathname = usePathname()
  const isActive = (path: string) => {
    // Remove country code from pathname for matching
    const cleanPathname = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'
    
    if (path === "/") {
      return cleanPathname === "/"
    }
    return cleanPathname.startsWith(path)
  }
  const navItems = [
    { href: "/", label: "Home", testId: "nav-home-link" },
    { href: "/store", label: "Store", testId: "nav-store-link" },
    { href: "/collections", label: "Collections", testId: "nav-collections-link" },
    { href: "/categories", label: "Categories", testId: "nav-categories-link" },
  ]
  
  return (
    <div className="hidden small:flex items-center gap-x-8 h-full">
      {navItems.map((item) => (
        <LocalizedClientLink
          key={item.href}
          href={item.href}
          className={`text-small-regular transition-all duration-200 relative h-full flex items-center ${
            isActive(item.href)
              ? "text-ui-fg-base border-b-2 border-ui-fg-base font-medium"
              : "text-ui-fg-subtle hover:text-ui-fg-base hover:border-b-2 hover:border-ui-fg-subtle"
          }`}
          data-testid={item.testId}
        >
          {item.label}
        </LocalizedClientLink>
      ))}
    </div>
  )
}
