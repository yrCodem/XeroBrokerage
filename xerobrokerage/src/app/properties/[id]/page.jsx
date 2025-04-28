import { connectDB } from "@/lib/db";
import PropertyModel from "@/lib/models/Property";
import placeholderImage from "@/assets/placeholder-house.png";

export async function generateMetadata({ params }) {
  return {
    title: "Property Details",
    description: "View property listing details",
  };
}

export default async function PropertyDetails({ params }) {
  const { id } = await params;

  await connectDB();

  const property = await PropertyModel.findById(id).lean();
  console.log(property);
  

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Property not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Property Title */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-blue-800">{property.title}</h1>
        <p className="text-gray-600 mt-2">{property.address}</p>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <img
          key={property._Id}
          src={property.images[0] || placeholderImage.src}
          alt={"House Image"}
          className="rounded-xl object-cover w-full h-64 shadow-md"
        />
      </div>

      {/* Basic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Price:</span> ₹
            {property.price.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {property.size} sq ft
          </p>
          <p>
            <span className="font-semibold">Configuration:</span>{" "}
            {property.bhkConfig}
          </p>
          <p>
            <span className="font-semibold">Beds:</span> {property.beds}
          </p>
          <p>
            <span className="font-semibold">Baths:</span> {property.baths}
          </p>
          <p>
            <span className="font-semibold">Furnishing:</span>{" "}
            {property.furnishingStatus}
          </p>
          <p>
            <span className="font-semibold">Flooring:</span>{" "}
            {property.flooringType}
          </p>
          <p>
            <span className="font-semibold">Property Type:</span>{" "}
            {property.propertyType}
          </p>
          <p>
            <span className="font-semibold">Maintenance:</span> ₹
            {property.maintainence.toLocaleString()}/sq ft
          </p>
          <p>
            <span className="font-semibold">Possession Date:</span>{" "}
            {new Date(property.possessionDate).toLocaleDateString()}
          </p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Property Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {property.description}
          </p>
        </div>
      </div>

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">
            Amenities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {property.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="bg-blue-50 text-blue-700 py-2 px-4 rounded-lg text-center text-sm font-medium shadow-sm"
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
