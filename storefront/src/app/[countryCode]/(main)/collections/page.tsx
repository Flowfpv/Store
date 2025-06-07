import { Metadata } from "next"
import { getCollectionsList } from "@lib/data/collections"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore all of our collections.",
}

type Props = {
  params: {
    countryCode: string
  }
}

export default async function CollectionsPage({ params }: Props) {
  const { collections } = await getCollectionsList(0, 100)

  return (
    <div className="content-container py-6">
      <div className="mb-8 text-2xl-semi">
        <h1>All Collections</h1>
      </div>
      
      {collections?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collections.map((collection: HttpTypes.StoreCollection) => (
            <LocalizedClientLink
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group"
            >
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-ui-fg-interactive transition-colors">
                  {collection.title}
                </h3>                {collection.metadata?.description && typeof collection.metadata.description === 'string' && (
                  <p className="text-ui-fg-subtle text-sm">
                    {collection.metadata.description}
                  </p>
                )}
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-ui-fg-subtle">No collections available at the moment.</p>
        </div>
      )}
    </div>
  )
}
