'use client'

import { useState, useRef, useEffect } from 'react'
import {
  FiUploadCloud,
  FiCalendar,
  FiHome,
  FiLayers,
  FiCheckCircle,
} from 'react-icons/fi'

export default function Upload() {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [fileName, setFileName] = useState('')
  const [errors, setErrors] = useState({
    beds: '',
    baths: '',
    price: '',
    size: '',
    maintainence: '',
  })
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [possessionDate, setPossessionDate] = useState('')
  const [bhkConfig, setBhkConfig] = useState('')
  const [furnishingStatus, setFurnishingStatus] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [flooringType, setFlooringType] = useState('')
  const [description, setDescription] = useState('')
  const textareaRef = useRef(null)

  const amenitiesList = [
    "Children's Play Area",
    'Lift Facility',
    'Gym',
    'Clubhouse',
    'Swimming Pool',
    'Park',
    'Security',
    'Power Backup',
    'Utility Shops',
    '24*7 CCTV Surveillance',
    'Intercom',
    'Green Space',
    'Fire Safety',
    'Shopping Center',
    'Gas Pipeline',
    'Maintenance Staff',
  ]
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK+']
  const furnishingOptions = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished']
  const propertyOptions = ['Apartment', 'Villa', 'Office', 'Hostel', 'Flat']
  const flooringOptions = [
    'Vitrified Tiles',
    'Wooden Flooring',
    'Marble',
    'Granite',
    'Cement',
  ]

  // Validation
  const validateNumber = (name, value) => {
    if (value < 0) {
      setErrors(prev => ({ ...prev, [name]: 'Value cannot be negative' }))
      return false
    }
    setErrors(prev => ({ ...prev, [name]: '' }))
    return true
  }

  const handleAmenityChange = amenity => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity],
    )
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      setPreview(URL.createObjectURL(file))
    }
  }

  const formatCurrency = e => {
    let value = e.target.value.replace(/\D/g, '')
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    e.target.value = value
  }

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [description])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const formData = new FormData(e.target)
    formData.append('amenities', JSON.stringify(selectedAmenities))

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setMessage('✅ Property uploaded successfully!')
      console.log(data)
    } catch (err) {
      console.error(err)
      setMessage('❌ Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-bold text-blue-800 mb-2'>
            List Your Property
          </h1>
          <p className='text-lg text-blue-600'>
            Fill in the details to showcase your property
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-2xl shadow-xl overflow-hidden'
        >
          <div className='p-8 space-y-8'>
            {/* Basic Information Section */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-bold text-blue-800 border-b pb-2'>
                Basic Information
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Property Title */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Property Title <span className='text-red-500'>*</span>
                  </label>
                  <input
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                    placeholder='Meenakshi High Life Towers'
                    type='text'
                    name='title'
                    required
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Property Type <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <select
                      name='propertyType'
                      value={propertyType}
                      onChange={e => setPropertyType(e.target.value)}
                      className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none'
                      required
                    >
                      <option value=''>Select property type</option>
                      {propertyOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                      <FiHome className='text-gray-400' />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Full Address <span className='text-red-500'>*</span>
                </label>
                <input
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Standalone Building, Block 6, 80 Feet Rd'
                  type='text'
                  name='address'
                  required
                />
              </div>

              {/* Price and Size */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Property Price (₹) <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <span className='absolute left-3 top-3 text-gray-500'>
                      ₹
                    </span>
                    <input
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder='1,00,00,000'
                      type='text'
                      name='price'
                      required
                      onChange={e => {
                        formatCurrency(e)
                        validateNumber(
                          'price',
                          e.target.value.replace(/,/g, ''),
                        )
                      }}
                    />
                    {errors.price && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Size (sq ft) <span className='text-red-500'>*</span>
                  </label>
                  <input
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.size ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder='810'
                    type='number'
                    name='size'
                    required
                    min='0'
                    onChange={e => validateNumber('size', e.target.value)}
                  />
                  {errors.size && (
                    <p className='mt-1 text-sm text-red-600'>{errors.size}</p>
                  )}
                </div>
              </div>

              {/* Configuration */}
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Configuration <span className='text-red-500'>*</span>
                  </label>
                  <select
                    name='bhkConfig'
                    value={bhkConfig}
                    onChange={e => setBhkConfig(e.target.value)}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                  >
                    <option value=''>Select</option>
                    {bhkOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Bedrooms <span className='text-red-500'>*</span>
                  </label>
                  <input
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.beds ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder='3'
                    type='number'
                    name='beds'
                    required
                    min='0'
                    onChange={e => validateNumber('beds', e.target.value)}
                  />
                  {errors.beds && (
                    <p className='mt-1 text-sm text-red-600'>{errors.beds}</p>
                  )}
                </div>

                {/* Bathrooms */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Bathrooms <span className='text-red-500'>*</span>
                  </label>
                  <input
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.baths ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder='2'
                    type='number'
                    name='baths'
                    required
                    min='0'
                    onChange={e => validateNumber('baths', e.target.value)}
                  />
                  {errors.baths && (
                    <p className='mt-1 text-sm text-red-600'>{errors.baths}</p>
                  )}
                </div>

                {/* Furnishing */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Furnishing <span className='text-red-500'>*</span>
                  </label>
                  <select
                    name='furnishingStatus'
                    value={furnishingStatus}
                    onChange={e => setFurnishingStatus(e.target.value)}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                  >
                    <option value=''>Select</option>
                    {furnishingOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Details */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Possession Date <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type='date'
                      name='possessionDate'
                      value={possessionDate}
                      onChange={e => setPossessionDate(e.target.value)}
                      className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                {/* Flooring */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Flooring Type <span className='text-red-500'>*</span>
                  </label>
                  <select
                    name='flooringType'
                    value={flooringType}
                    onChange={e => setFlooringType(e.target.value)}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                  >
                    <option value=''>Select</option>
                    {flooringOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Maintenance */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Maintenance (₹/sq ft){' '}
                    <span className='text-red-500'>*</span>
                  </label>
                  <input
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.maintainence ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder='3.2'
                    type='number'
                    name='maintainence'
                    step='0.1'
                    required
                    min='0'
                    onChange={e =>
                      validateNumber('maintainence', e.target.value)
                    }
                  />
                  {errors.maintainence && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.maintainence}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-bold text-blue-800 border-b pb-2'>
                Property Images
              </h2>

              <div className='space-y-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Upload Images <span className='text-red-500'>*</span>
                </label>

                <div className='border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors'>
                  <FiUploadCloud className='mx-auto h-12 w-12 text-blue-400 mb-3' />
                  <div className='flex justify-center'>
                    <label className='px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors'>
                      Browse Files
                      <input
                        type='file'
                        className='hidden'
                        onChange={handleFileChange}
                        accept='image/*'
                        multiple
                        required
                      />
                    </label>
                  </div>
                  <p className='mt-3 text-sm text-gray-600'>
                    or drag and drop images here
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    PNG, JPG up to 5MB each (max 10 images)
                  </p>
                </div>

                {fileName && (
                  <div className='text-sm text-gray-600'>
                    Selected: {fileName}
                  </div>
                )}

                {preview && (
                  <div className='mt-4 grid grid-cols-3 gap-4'>
                    <img
                      src={preview}
                      alt='Preview'
                      className='rounded-lg border border-gray-200 h-32 object-cover'
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-bold text-blue-800 border-b pb-2'>
                Description
              </h2>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Property Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                  ref={textareaRef}
                  name='description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]'
                  placeholder='Describe your property in detail... (location advantages, special features, nearby amenities)'
                  required
                />
                <div className='text-xs text-gray-500 mt-1'>
                  {description.length}/2000 characters
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-bold text-blue-800 border-b pb-2'>
                Amenities
              </h2>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>
                  Select Available Amenities
                </label>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {amenitiesList.map(amenity => (
                    <div key={amenity} className='flex items-center'>
                      <input
                        type='checkbox'
                        id={`amenity-${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className='ml-2 text-sm text-gray-700'
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className='pt-6'>
              <button
                type='submit'
                className={`w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 flex items-center justify-center ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'List My Property'
                )}
              </button>

              {message && (
                <div
                  className={`mt-4 p-3 rounded-lg text-center ${
                    message.includes('✅')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
