import Image from 'next/image'
import Link from 'next/link'

export default function PropertyCard({ property }) {
  return (
    <div className='card bg-base-100 shadow-md hover:shadow-xl transition-shadow lg:w-[30%] md:w-[45%] w-[95%]  '>
      <figure className='h-48 relative'>
        <Image
          alt={property.title}
          src={property.image || '/property-placeholder.jpg'}
          fill
          className='object-contain'
          sizes='(max-width: 768px) 100vw, 33vw'
          priority={property.featured}
        />
      </figure>
      <div className='card-body p-2'>
        <h3 className='card-title poppins-semibold text-xl mt-4'>
          ₹{property.price.toLocaleString('en-IN')}
        </h3>
        <p className='text-gray-600'>{property.address}</p>
        <div className='flex gap-4 mt-2 text-md poppins-regular'>
          <span>Beds : {property.beds}</span>
          <span>Bathrooms :  {property.baths}</span>
        </div>
        <div className='card-actions mt-4'>
          <Link
            href={`/properties/${property.id}`}
            className='btn btn-primary btn-sm w-full'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
