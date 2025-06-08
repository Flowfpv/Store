import { Button, Heading } from "@medusajs/ui"
import { Settings, Zap } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { getCollectionByHandle } from "@lib/data/collections"
import { getProductsList, getProductsById } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { getProductPrice } from "@lib/util/get-product-price"

async function getFeaturedProducts(countryCode: string) {
  try {
    const region = await getRegion(countryCode)
    if (!region) {
      return []
    }

    // First, try to get the "Featured" collection
    const featuredCollection = await getCollectionByHandle("featured")
    
    if (featuredCollection) {
      // Get products from the Featured collection
      const { response } = await getProductsList({
        queryParams: { 
          limit: 4 
        },
        countryCode,
      })
      
      // Filter products that belong to the featured collection
      const featuredProducts = response.products.filter(
        product => product.collection_id === featuredCollection.id
      )
      
      if (featuredProducts.length > 0) {
        // Get products with pricing data
        const productIds = featuredProducts.slice(0, 4).map(p => p.id!).filter(Boolean)
        const pricedProducts = await getProductsById({
          ids: productIds,
          regionId: region.id,
        })
        return pricedProducts
      }
    }
    
    // Fallback: get first 4 products if no Featured collection or no products in collection
    const { response } = await getProductsList({
      queryParams: { limit: 4 },
      countryCode,
    })
    
    // Get products with pricing data
    const productIds = response.products.slice(0, 4).map(p => p.id!).filter(Boolean)
    const pricedProducts = await getProductsById({
      ids: productIds,
      regionId: region.id,
    })
    return pricedProducts
    
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

const Hero = async ({ countryCode }: { countryCode: string }) => {
  const featuredProducts = await getFeaturedProducts(countryCode)
  const region = await getRegion(countryCode)
  return (    <div className="relative w-full overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000000' fill-opacity='1'%3e%3ccircle cx='30' cy='30' r='1.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
        }} />
      </div>      {/* Main hero content */}
      <div className="relative z-10 flex items-center min-h-[50vh] pt-8 pb-12">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-gray-900 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                  <Zap className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">New FPV configurator</span>
                </div>
                  <Heading
                  level="h1"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900"
                >
                  Build Your Perfect
                  <span className="text-gray-800 block">
                    FPV Drone
                  </span>
                </Heading>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Configure your own FPV Drone online and get it shipped to your door. Choose from a wide range of components, customize your setup, and take your FPV experience to the next level.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full" />
                  <span className="text-gray-700 font-medium">Custom Configurations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full" />
                  <span className="text-gray-700 font-medium">Premium Components</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full" />
                  <span className="text-gray-700 font-medium">Compatibility check</span>
                </div>
              </div>              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">                <LocalizedClientLink href="/store">
                  <Button 
                    size="large" 
                    className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Start Configuring
                  </Button>
                </LocalizedClientLink>
                
                <LocalizedClientLink href="/store" className="self-center sm:self-start mt-2 sm:mt-3">
                  <span className="text-gray-700 hover:text-gray-900 font-medium underline decoration-2 underline-offset-4 transition-colors duration-300">
                    Browse our shop
                  </span>
                </LocalizedClientLink>
              </div>
            </div>            {/* Right content - Featured drone showcase */}
            <div className="relative pl-14 lg:block hidden">
              <div className="relative">
                {/* Subtle shadow behind the drone */}
                <div className="absolute inset-0 bg-gray-200/30 rounded-full blur-3xl scale-110 translate-y-8" />
                
                {/* Main drone image */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
                  <Image
                    src="/drone.png"
                    alt="Professional FPV Racing Drone"
                    width={600}
                    height={400}
                    className="object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>        </div>
      </div>      {/* Featured Products Section */}
      <div className="relative z-10 pb-8">
        <div className="content-container">
          <div className="text-left mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Featured Products</h2>
            <p className="text-gray-600 max-w-xl">Discover our most popular FPV drones and components, carefully selected for performance and reliability.</p>
          </div>          {/* Products Grid - Compact Layout */}
          {featuredProducts.length > 0 && region ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl">
              {featuredProducts.slice(0, 4).map((product) => (
                <LocalizedClientLink key={product.id} href={`/products/${product.handle}`}>
                  <div className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title || 'Product'}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>                    <div className="space-y-1 px-2 pb-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product.title || 'Product'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {(() => {
                          const { cheapestPrice } = getProductPrice({ product })
                          return cheapestPrice?.calculated_price || 'View Details'
                        })()}
                      </p>
                    </div>
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl">
              {/* Compact placeholder products */}
              {[
                { name: "FPV Racing Quad", price: "$299", handle: "fpv-racing-quad" },
                { name: "Freestyle Beast", price: "$399", handle: "freestyle-beast" },
                { name: "Cinema Pro", price: "$599", handle: "cinema-pro" },
                { name: "Long Range Explorer", price: "$799", handle: "long-range-explorer" }
              ].map((product, index) => (
                <LocalizedClientLink key={index} href={`/store`}>
                  <div className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
                    <div className="aspect-[3/4] w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Sample Product</span>
                    </div>
                    <div className="space-y-1 px-2 pb-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </LocalizedClientLink>
              ))}            </div>
          )}
        </div>
      </div>

      {/* Clean bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent z-10" />
    </div>
  )
}

export default Hero
