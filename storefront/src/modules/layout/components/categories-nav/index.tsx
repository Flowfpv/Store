import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function CategoriesNav() {
  const categories = await listCategories()

  if (!categories || categories.length === 0) {
    return null
  }
  return (
    <div className="border-b border-ui-border-base bg-ui-bg-subtle">
      <div className="content-container px-4 small:px-8">
        <div className="flex items-center justify-center gap-x-6 py-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="text-small-regular text-ui-fg-subtle hover:text-ui-fg-base transition-colors duration-200 whitespace-nowrap py-2 px-3 rounded-md hover:bg-ui-bg-base flex-shrink-0"
              data-testid={`category-${category.handle}-link`}
            >
              {category.name}
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  )
}
