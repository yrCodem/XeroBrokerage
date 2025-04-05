import PropertySearch from '@/components/search/PropertySearch'
import FeaturedListing from '@/components/search/FeaturedListing'
// import { getFeaturedListing } from '@/services/PropertyServices'

export default async function Home() {
  //   const properties = await getFeaturedListing() // Server-side data fetch

  return (
    <>
      {/* Hero Section */}
      <section className='bg-primary/5 py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold mb-4'>
            Find Your Perfect Property
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Discover thousands of listings across the country with zero
            brokerage fees
          </p>
        </div>
      </section>

      {/* Search Component */}
      <div className='container mx-auto px-4 -mt-8 mb-16'>
        <PropertySearch />
      </div>

      {/* Featured Listings */}
      <section className='container mx-auto px-4 mb-16'>
        <h2 className='text-2xl font-semibold mb-6'>Featured Properties</h2>
        {/* <FeaturedListing properties={properties} /> */}
      </section>
    </>
  )
}
