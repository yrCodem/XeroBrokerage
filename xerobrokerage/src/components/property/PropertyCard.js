import Image from 'next/image'
import Link from 'next/link'

export default function PropertyCard({ property }) {
  return (
    <div className='card bg-base-100 shadow-md hover:shadow-xl transition-shadow'>
      <figure className='h-48 relative'>
        <Image
          src={property.image || '/property-placeholder.jpg'}
          alt={property.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 33vw'
          priority={property.featured}
        />
      </figure>
      <div className='card-body'>
        <h3 className='card-title'>
          ₹{property.price.toLocaleString('en-IN')}
        </h3>
        <p className='text-gray-600'>{property.address}</p>
        <div className='flex gap-4 mt-2 text-sm'>
          <span>🛏️ {property.beds} beds</span>
          <span>🚿 {property.baths} baths</span>
          <span>📏 {property.area} sq.ft</span>
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
