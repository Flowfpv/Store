import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore all of our product categories.",
}

type Props = {
  params: {
    countryCode: string
  }
}

export default async function CategoriesPage({ params }: Props) {
  const categories = await listCategories()

  // Get only top-level categories (those without a parent)
  const topLevelCategories = categories?.filter((category: HttpTypes.StoreProductCategory) => 
    !category.parent_category_id
  ) || []

  return (
    <div className="content-container py-6">
      <div className="mb-8 text-2xl-semi">
        <h1>All Categories</h1>
      </div>
      
      {topLevelCategories?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topLevelCategories.map((category: HttpTypes.StoreProductCategory) => (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="group"
            >
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-ui-fg-interactive transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-ui-fg-subtle text-sm mb-3">
                    {category.description}
                  </p>
                )}
                {category.category_children && category.category_children.length > 0 && (
                  <div className="text-xs text-ui-fg-muted">
                    {category.category_children.length} subcategories
                  </div>
                )}
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-ui-fg-subtle">No categories available at the moment.</p>
        </div>
      )}
    </div>
  )
}
