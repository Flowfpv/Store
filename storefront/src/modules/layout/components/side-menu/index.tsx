"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"
import { Menu, Home, Store, Search, User, ShoppingCart } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Store", href: "/store", icon: Store },
  { name: "Search", href: "/search", icon: Search },
  { name: "Account", href: "/account", icon: User },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
]

const SideMenu = ({ 
  regions, 
  store 
}: { 
  regions: HttpTypes.StoreRegion[] | null
  store?: { name?: string } | null
}) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center justify-center p-2 hover:bg-ui-bg-subtle rounded-md transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <Menu size={20} />
                </Popover.Button>
              </div><Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {/* Backdrop overlay */}
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={close} />
              </Transition>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Popover.Panel className="fixed left-0 top-0 h-full w-80 max-w-[85vw] z-50 bg-white shadow-xl border-r border-ui-border-base">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full"
                  >                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-ui-border-base">
                      <h2 className="txt-compact-xlarge-plus font-semibold text-ui-fg-base pl-4">Menu</h2><button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        className="p-2 rounded-full hover:bg-ui-bg-subtle transition-colors duration-200"
                      >
                        <XMark className="h-5 w-5" />
                      </button>
                    </div>                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto">
                      <nav className="p-3">
                        <ul className="space-y-2">
                          {SideMenuItems.map((item) => {
                            const IconComponent = item.icon
                            return (
                              <li key={item.name}>                                <LocalizedClientLink
                                  href={item.href}
                                  className="flex items-center w-full p-3 txt-compact-xlarge-plus font-semibold text-ui-fg-base hover:bg-ui-bg-subtle rounded-lg transition-all duration-200 hover:text-ui-fg-interactive"
                                  onClick={close}
                                  data-testid={`${item.name.toLowerCase()}-link`}
                                >
                                  <IconComponent size={20} className="mr-3" />
                                  <span>{item.name}</span>
                                </LocalizedClientLink>
                              </li>
                            )
                          })}
                        </ul>
                      </nav>
                    </div>                    {/* Footer */}
                    <div className="border-t border-ui-border-base p-3 space-y-4">
                      {regions && (
                        <div
                          className="flex items-center justify-between p-3 bg-ui-bg-subtle rounded-lg cursor-pointer hover:bg-ui-bg-field transition-colors duration-200"
                          onMouseEnter={toggleState.open}
                          onMouseLeave={toggleState.close}
                        >
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />                          <ArrowRightMini
                            className={clx(
                              "h-4 w-4 transition-transform duration-200 text-ui-fg-subtle",
                              toggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      )}                      <Text className="text-xs text-ui-fg-subtle text-left">
                        © {new Date().getFullYear()} Flow FPV. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
