'use client'

import { useState } from 'react'

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

  // Possession status
  const [possessionDate, setPossessionDate] = useState('')

  //   Configuration status
  const [bhkConfig, setBhkConfig] = useState('')
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK+']

  // Furnishing Status
  const [furnishingStatus, setFurnishingStatus] = useState('')
  const furnishingOptions = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished']

  // Property Type
  const [propertyType, setPropertyType] = useState('')
  const propertyOptions = ['Apartment', 'Villa', 'Office', 'Hostel', 'Flat']

  // Flooring Type
  const [flooringType, setFlooringType] = useState('')
  const flooringOptions = ['Vitrified Tiles', 'Wooden Flooring']
  // Number validation
  const validateNumber = (name, value) => {
    if (value < 0) {
      setErrors(prev => ({ ...prev, [name]: 'Value cannot be negative' }))
      return false
    }
    setErrors(prev => ({ ...prev, [name]: '' }))
    return true
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const formData = new FormData(e.target)

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      setMessage('✅ Property uploaded!')
      console.log(data)
    } catch (err) {
      console.error(err)
      setMessage('❌ Upload failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-8 items-center justify-center'>
      <h1 className='mt-16 text-5xl poppins-black text-center'>
        Upload Your Property...
      </h1>
      <form
        onSubmit={handleSubmit}
        className='bg-black/10 shadow-2xl backdrop-blur-md rounded-2xl p-12 w-full max-w-md space-y-6 text-black'
      >
        <h2 className='text-2xl font-bold text-center'>Enter All the Fields</h2>

        {/* Title */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='user_avatar'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Property Title
          </label>
          <input
            className='w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-400 focus:outline-none'
            placeholder='Ex. Meenakshi High Life Towers'
            type='text'
            name='title'
            required
          />
        </div>

        {/* Full Address */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='user_avatar'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Property Full Address
          </label>
          <input
            className='w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-400 focus:outline-none'
            placeholder='Ex. Standalone Building, Block 6, 80 Feet Rd'
            type='text'
            name='address'
            required
          />
        </div>

        {/* Price */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='user_avatar'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Property Price
          </label>
          <input
            className={`w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-400 focus:outline-none ${
              errors.price ? 'border border-red-500' : ''
            }`}
            placeholder='Ex. 1,000,000'
            type='number'
            name='price'
            required
            min='0'
            onChange={e => validateNumber('price', e.target.value)}
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
          {errors.price && (
            <p className='text-red-500 text-sm mt-1'>{errors.price}</p>
          )}
        </div>

        {/* No. of Bedrooms */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='user_avatar'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            No. of Bedrooms
          </label>
          <input
            className={`w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-400 focus:outline-none ${
              errors.beds ? 'border border-red-500' : ''
            }`}
            placeholder='Ex. 3'
            type='number'
            name='beds'
            required
            min='0'
            onChange={e => validateNumber('beds', e.target.value)}
          />
          {errors.beds && (
            <p className='text-red-500 text-sm mt-1'>{errors.beds}</p>
          )}
        </div>

        {/* No. of Bathrooms */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='user_avatar'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            No. of Bathrooms
          </label>
          <input
            className={`w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-400 focus:outline-none ${
              errors.baths ? 'border border-red-500' : ''
            }`}
            placeholder='Ex. 3'
            type='number'
            name='baths'
            required
            min='0'
            onChange={e => validateNumber('baths', e.target.value)}
          />
          {errors.baths && (
            <p className='text-red-500 text-sm mt-1'>{errors.baths}</p>
          )}
        </div>

        {/* Possession Date */}
        <div className='relative'>
          <label
            htmlFor='possession-date'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Possession Date
          </label>
          <input
            type='date'
            id='possession-date'
            name='possessionDate'
            value={possessionDate}
            onChange={e => setPossessionDate(e.target.value)}
            className='w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-400 focus:outline-none'
            min={new Date().toISOString().split('T')[0]} // Optional: Restrict to future dates
            required
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pt-5 pointer-events-none'>
            <svg
              className='w-0 h-0 text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>

        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='user_avatar'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Upload Property Image
          </label>

          <div className='flex items-center'>
            <label
              htmlFor='user_avatar'
              className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-l-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'
            >
              Browse...
            </label>

            <div className='flex-1 px-4 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'>
              {fileName || 'No file selected'}
            </div>

            <input
              type='file'
              id='user_avatar'
              name='image'
              className='hidden'
              onChange={handleFileChange}
              aria-describedby='user_avatar_help'
              accept='image/*'
              required
            />
          </div>

          {/* {preview && (
            <img
              src={preview}
              alt='Preview'
              className='mt-4 w-full rounded-xl border border-gray-300 shadow-md'
            />
          )} */}

          <div
            className='mt-1 text-sm text-gray-500 dark:text-gray-300'
            id='user_avatar_help'
          >
            A property image helps attract more buyers
          </div>
        </div>

        {/* Overview Section */}
        <h2 className='text-2xl font-bold text-left'>Overview</h2>

        {/* Property Type */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='property-type'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Property Type
          </label>
          <select
            id='property-type'
            name='propertyType'
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
            className='w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md focus:outline-none text-gray-900 '
            required
          >
            <option value='' disabled className='text-white'>
              Select Property Type
            </option>
            {propertyOptions.map(option => (
              <option key={option} value={option} className='text-gray-400'>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Size */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='user_avatar'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Size (in sq ft)
          </label>
          <input
            className={`w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-400 focus:outline-none ${
              errors.size ? 'border border-red-500' : ''
            }`}
            placeholder='Ex. 810'
            type='float'
            name='size'
            required
            min='0'
            onChange={e => validateNumber('size', e.target.value)}
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
          {errors.size && (
            <p className='text-red-500 text-sm mt-1'>{errors.size}</p>
          )}
        </div>

        {/* BHK configration */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='bhk-config'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Property Configuration
          </label>
          <select
            id='bhk-config'
            placeholder='Select BHK Configration'
            name='bhkConfig'
            value={bhkConfig}
            onChange={e => setBhkConfig(e.target.value)}
            className='w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md focus:outline-none text-gray-900 placeholder-gray-400'
            required
          >
            <option value='' disabled className='text-white'>
              Select BHK configuration
            </option>
            {bhkOptions.map(option => (
              <option key={option} value={option} className='text-gray-400'>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Furnishing Status */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='furnishing-status'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Furnishing Status
          </label>
          <select
            id='furnishing-status'
            name='furnishingStatus'
            value={furnishingStatus}
            onChange={e => setFurnishingStatus(e.target.value)}
            className='w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md focus:outline-none text-gray-900 '
            required
          >
            <option value='' disabled className='text-white'>
              Select furnishing status
            </option>
            {furnishingOptions.map(option => (
              <option key={option} value={option} className='text-gray-400'>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Maintainence */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='user_avatar'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Maintainence (Rs. per sq ft/M)
          </label>
          <input
            className={`w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-400 focus:outline-none ${
              errors.maintainence ? 'border border-red-500' : ''
            }`}
            placeholder='Ex. Rs.3.2'
            type='float'
            name='maintainence'
            required
            min='0'
            onChange={e => validateNumber('size', e.target.value)}
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
          {errors.maintainence && (
            <p className='text-red-500 text-sm mt-1'>{errors.maintainence}</p>
          )}
        </div>

        {/* Flooring Type */}
        <div className='max-w-lg mx-auto'>
          <label
            htmlFor='flooring-type'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Flooring Type
          </label>
          <select
            id='flooring-type'
            name='flooringType'
            value={flooringType}
            onChange={e => setFlooringType(e.target.value)}
            className='w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md focus:outline-none text-gray-900 '
            required
          >
            <option value='' disabled className='text-white'>
              Select Flooring Type
            </option>
            {flooringOptions.map(option => (
              <option key={option} value={option} className='text-gray-400'>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          type='submit'
          className={`w-full bg-black text-white hover:bg-gray-800 transition-all duration-300 py-2 px-4 rounded-xl font-semibold ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Property'}
        </button>

        {message && <p className='text-center mt-2 font-medium'>{message}</p>}
      </form>
    </div>
  )
}
