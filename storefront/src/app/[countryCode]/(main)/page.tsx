import { Metadata } from "next"

import Hero from "@modules/home/components/hero"

export const metadata: Metadata = {
  title: "Flow FPV - Custom FPV Drone Configurator & Store",
  description:
    "Build and customize your perfect FPV racing drone with our advanced configurator. Premium components, expert support, and cutting-edge technology for every pilot.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  return (
    <>
      <Hero countryCode={countryCode} />
    </>
  )
}
