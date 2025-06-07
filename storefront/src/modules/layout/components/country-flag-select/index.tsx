"use client"

import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"

import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountryFlagSelectProps = {
  regions: HttpTypes.StoreRegion[]
}

const CountryFlagSelect = ({ regions }: CountryFlagSelectProps) => {
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2!,
          region: r.id,
          label: c.display_name!,
        }))
      })
      .flat()
      .filter((option): option is CountryOption => option !== undefined)
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      if (option) {
        setCurrent(option)
      }
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
  }

  if (!current) return null

  return (
    <Listbox value={current} onChange={handleChange}>
      <Listbox.Button className="p-2 hover:text-ui-fg-base transition-colors relative hover:bg-ui-bg-subtle rounded-md">
        <ReactCountryFlag
          svg
          style={{
            width: "24px",
            height: "24px",
          }}
          countryCode={current.country ?? ""}
          title={current.label}
        />
      </Listbox.Button>
      
      <Transition
        as={Fragment}
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute top-full right-0 mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {options?.map((option, index) => (
            <Listbox.Option
              key={index}
              value={option}
              className="relative cursor-pointer select-none py-2 px-3 text-gray-900 hover:bg-gray-100 flex items-center gap-x-3"
            >
              <ReactCountryFlag
                svg
                style={{
                  width: "20px",
                  height: "20px",
                }}
                countryCode={option?.country ?? ""}
              />
              <span className="text-sm">{option?.label}</span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}

export default CountryFlagSelect
