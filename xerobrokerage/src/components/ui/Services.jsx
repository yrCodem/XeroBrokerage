import React from 'react'
import {
  FiHome,
  FiDollarSign,
  FiDroplet,
  FiFileText,
  FiTruck,
  FiTool,
} from 'react-icons/fi'

export default function ServiceSection() {
  const services = [
    {
      title: 'Construction',
      description: 'Connect directly with trusted contractors and architects',
      icon: <FiHome className='text-blue-600' size={28} />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Home/Land Loan',
      description: 'Get loan assistance without broker commissions',
      icon: <FiDollarSign className='text-green-600' size={28} />,
      bgColor: 'bg-green-50',
    },
    {
      title: 'Interior Design',
      description: 'Find verified interior designers for your dream home',
      icon: <FiDroplet className='text-purple-600' size={28} />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Legal Agreements',
      description: 'Assistance in creating rental agreements & paperwork',
      icon: <FiFileText className='text-orange-600' size={28} />,
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Raw Materials',
      description:
        'Source quality construction materials directly from suppliers',
      icon: <FiTruck className='text-red-600' size={28} />,
      bgColor: 'bg-red-50',
    },
    {
      title: 'Hardware',
      description: 'Connect with hardware providers for fixtures and fittings',
      icon: <FiTool className='text-yellow-600' size={28} />,
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900'>Our Services</h2>
          <p className='mt-4 text-xl text-gray-600'>
            Direct connections to verified professionals - your one-stop
            solution XeroBroker
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bgColor} p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div className='flex items-center mb-4'>
                <div className='p-3 rounded-lg bg-white mr-4 shadow-sm'>
                  {service.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {service.title}
                </h3>
              </div>
              <p className='text-gray-600 mb-4'>{service.description}</p>
              <button className='text-blue-600 font-medium flex items-center'>
                Learn more
                <svg
                  className='w-4 h-4 ml-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
